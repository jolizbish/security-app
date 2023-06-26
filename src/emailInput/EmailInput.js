import './EmailInput.css';
import { TextField, FormControl } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import React, { useState } from 'react';

const EmailInput = ({ handleEmailChange, fieldName, label, helperText }) => {   
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState(false);
    
    const handleChange = event => {
        const val = event.target.value;                
        
        if(isEmail(val)) {
            setIsValid(true);              
        } else {
            setIsValid(false);              
        }
        
        setValue(val);                
        handleEmailChange(val, isValid);
    }

    return (
        <React.Fragment>
            <div className="email-input">
                <FormControl>
                    <TextField         
                        error={touched && isValid === false}                                        
                        onBlur={() => setTouched(true)}
                        id={fieldName}                    
                        label={label}
                        name={fieldName}                    
                        variant="outlined" 
                        size={'small'}
                        helperText={helperText}
                        value={value}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => handleChange(e)}
                        style={{marginTop: 1}}
                    />
                </FormControl>
            </div>
        </React.Fragment>
    )
}

export default EmailInput;