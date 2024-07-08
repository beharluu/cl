import styles from '../styles/help.module.css';
import React from "react";


const Help = () => {
    return (
        <div className={styles.help}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <span>
                        <img src="home.png" />
                        Help Center
                    </span>
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.right}>
                    <span>Englisht (US)</span>
                </div>
            </div>
        </div>
    )
};

export default Help;
