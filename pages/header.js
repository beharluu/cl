import styles from '../styles/header.module.css';
import 'react-phone-input-2/lib/style.css'
import React from "react";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <span className={styles.logo}>Facebook</span>
                <div className={styles.search}>
                    <img src="./search.svg"/>
                    <input type="search" placeholder='How can we help?'/>
                </div>
            </div>
        </div>
    )
};

export default Header;
