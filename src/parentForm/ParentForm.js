import './ParentForm.css';
import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import EmailInput from '../emailInput/EmailInput';
import axios from 'axios';

const ParentForm = (props) => {
    const [emailState, setEmailState] = useState({ email: '', isValidEmail: false, lastRequestedEmail: null })

    const handleEmailChange = (value, isValid) => {      
        setEmailState({ ...emailState, email: value, isValidEmail: isValid });
    }
     
    const handleSubmitForm = useCallback(() => {
        console.log('handling submit')
        axios.get('http://localhost:3001/breaches', { params: { email: emailState.email }}) 
        .then(response => {
            props.setBreachData({ breachData: response.data });
            setEmailState({ ...emailState, lastRequestedEmail: emailState.email });
        })
        .catch(err => console.error(err))
    }, [emailState, props])

    return (
        <div className="parent-form">
            {emailState.lastRequestedEmail ?
                <h1>Displaying results for {emailState.lastRequestedEmail}</h1> 
            : 
                <h1>Have I been exposed in a data breach?</h1>
            }     
            <p>Enter your email address to find out.</p>

            <EmailInput placeholder=""
                helperText="(Required)"
                label="Email"
                fieldName="Email"
                handleEmailChange={handleEmailChange}
            />

            {emailState.isValidEmail ?
                <Button variant="contained" color="primary" onClick={handleSubmitForm}>
                    Submit
                </Button>
            :
                <Button variant="contained" color="primary" disabled>
                    Submit
                </Button>
            }
        </div>
    );
}

export default ParentForm;