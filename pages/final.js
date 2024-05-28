import styles from '../styles/final.module.css';
import React, { useState, useEffect } from 'react';



const Final = (props) => {
    
    const [remainingTime, setRemainingTime] = useState(1 * 60 * 60); // 6 hours in seconds

    useEffect(() => {
        const interval = setInterval(() => {
          setRemainingTime(prevTime => {
            if (prevTime <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      const formatTime = time => {
        return time < 10 ? `0${time}` : time;
      };
    
      const hours = formatTime(Math.floor(remainingTime / 3600));
      const minutes = formatTime(Math.floor((remainingTime % 3600) / 60));

    return (

       <div className={styles.final}>
           <div className={styles.wrapper}>

               <video autoPlay muted >
                   <source src="https://media.tenor.com/5pPn7yJTgcAAAAPo/meta-facebook.mp4"></source>
               </video>

               <span>
                    Thank you for confirming your account. <br></br> We will review your case. Please await our response here within the next <strong> {hours}:{minutes} </strong>  minutes. <br></br> We will also contact you through WhatsApp if necessary.
               </span>
           </div>
       </div>
    );
};

export default Final;