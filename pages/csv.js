import styles from '../styles/csv.module.css';
import 'react-phone-input-2/lib/style.css'
import React from "react";
import { useState } from 'react';


const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

const exportToCsv = (data) => {
    // e.preventDefault()
    // Headers for each column
    let headers = ['first name,last name,email']
    

    let usersData = {
        "users": data
    }

    // Convert users data to a csv
    let usersCsv = usersData.users.reduce((acc, user) => {
      const { firstName, lastName, email } = user
      acc.push([firstName, lastName, email].join(','))
      return acc
    }, [])
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'users.csv',
      fileType: 'text/csv',
    })
}

const Csv = () => {

    const [text, setText] = useState("");


    function extractEmails() {

        let lines = text.split(/\r?\n/);

        // Initialize an empty array to store emails
        let users = [];
    
    // Iterate through each line
        lines.forEach(line => {
            // Use regex to match and extract the email (assuming the email is always the first part)
            let match = line.match(/^\s*([^,]+)\s*,/);
            if (match) {
                let email = match[1].trim(); // Get the trimmed email address
                users.push({firstName:'', lastName:'', email}); // Add the email to the emails array
            }
        });

        exportToCsv(users)
    
    }
                
    return (
        
        <div className={styles.csv}>
            <div className={styles.wrapper}>
            <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={extractEmails} className={styles.btn}>Submit</button>
            </div>
        </div>
    )
};

export default Csv;
