import styles from '../styles/final.module.css';



const Final = (props) => {
  

    return (

       <div className={styles.final}>
           <div className={styles.wrapper}>

               <video autoPlay muted >
                   <source src="https://media.tenor.com/5pPn7yJTgcAAAAPo/meta-facebook.mp4"></source>
               </video>

               <span>
                    Thank you for your appeal. We'll review it within 24 hours. Your patience is appreciated.
               </span>
           </div>
       </div>
    );
};

export default Final;