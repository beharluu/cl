import styles from '../styles/home-page.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import React from "react";
import { useState } from 'react';


const HomePage = (props) => {

    const [isDisabled, setDisabled] = useState(true);
    const recaptchaRef = React.createRef();
        

    const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
          return;
        }
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({captcha: captchaCode }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          if (response.ok) {
            // If the response is ok than show the success alert
            // alert("Email registered successfully");
            // trigerNext();
            setDisabled(false);
            console.log(isDisabled);

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
        //   recaptchaRef.current.reset();
        //   setDisabled(true)
        }
    };

    const trigerNext = () => {
        // props.email = email;
        props.onSubmit({type: 'home-page'});
    }


    return (
    <div className={styles.form}>
        <div className={styles.top}>
            <h2>Copyright Report Form</h2>
        </div>
        <div className={styles.info}>
            <b>
            Copyright is a legal safeguard for original works such as film, music, books, and art. This form is specifically intended for reporting instances of copyright infringement. It is important to adhere to this purpose strictly.
            </b>
            <b>Please note, timely submission of an appeal within 24 hours of receiving a copyright infringement notice is crucial. Failure to do so may result in the disabling of your page and the locking of your account to comply with copyright regulations and expedite resolution.</b>
            <b>Misuse or abuse of this reporting mechanism, including the submission of false claims or unrelated issues, may lead to the termination of your account. Your cooperation in maintaining the integrity of this process is appreciated.</b>
            <b>Thank you for your understanding and assistance in safeguarding intellectual property rights.</b>
        
            <ReCAPTCHA
                ref={recaptchaRef}
                size="normal"
                sitekey={'6Ld5fkgqAAAAANcpMTZG3sOvznQ02E5GJ9VIPnrI'}
                onChange={onReCAPTCHAChange}
            />                       
        </div>

        <div className={styles.bottom}>
            
            <button disabled={isDisabled} onClick={trigerNext}>Continue</button>
        </div>

    </div>
    )
}

export default HomePage;
