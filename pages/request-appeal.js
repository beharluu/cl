
import styles from '../styles/request-appeal.module.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React from "react";
import { useEffect, } from 'react';
import axios from 'axios'

const RequestAppeal = (props) => {

    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState('+1');
    const [appeal, setAppeal] = React.useState("");

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
    //    sendOpenedScript()
    },[]);

    const onFullNameChange = async (data) => { 
        setFullName(data.target.value);
    }

    const onPhoneChange = async (data) => { 
        setPhone(data);
    }

    const onEmailChange = async (data) => { 
        setEmail(data.target.value);
    }

    const onAppealChange = async (data) => { 
        setAppeal(data.target.value);
    }

    const trigerNext = async () => { 
        props.onSubmit({type: 'request-appeal', data: {fullName,email,phone, appeal}});
    }


    return (
    <div className={styles.form}>
        <div className={styles.top}>
            <h2>Copyright Report Form</h2>
        </div>
        <div className={styles.info}>
            <b>
                If you choose to submit this report, we will provide the rights owner's name, your email address, and the nature of your report to the person who posted the content you are reporting. This person may use the information you provide to contact you about the report and attempt to resolve the issue. For this reason, you may wish to provide a valid business or professional email address.
            </b>
            <div className={styles.formControl}>
                <label>Your full name</label>
                <input
                onChange={(e) => onFullNameChange(e)}
                type="text" />
            </div>
            <div className={styles.formControl}>
                <label>Email</label>
                <input
                required
                onChange={(e) => onEmailChange(e)}
                type="email" />
            </div>
            <div className={styles.formControl}>
                <label>Phone number</label>
                <PhoneInput 
                    country={'us'}
                    required 
                    value={phone} 
                    onChange={(e) => onPhoneChange(e)}
                /> 
            </div>  
            <div className={styles.formControl}>
                <label>Appeal</label>
               <textarea
                onChange={(e) => onAppealChange(e)}
               ></textarea>
            </div> 
        </div>

        <div className={styles.bottom}>
            <button onClick={trigerNext}>Continue</button>
        </div>

    </div>
    );
};

export default RequestAppeal;