import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import './loginScreen.scss';

const LoginScreen = ({ firestore }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    useEffect(() => {
        window.scrollTo(0,0);
    });

    const handleInput = (event, callback) => {
        callback(event.target.value);
    }

    const handleLoginError = ({ code }) => {
        if (code === 'auth/user-not-found') {
            setError("Denne brukeren finnes ikke. Prøv igjen!")
        } else {
            setError("Du skrev inn feil passord!")
        }
    }

    const handleSubmit = () => {
        setError('');
        
        if (email && password) {
            firestore.login(email, password, handleLoginError);
        } else {
            setError('Fyll inn brukernavn og passord!');
        }
    }

    return (
        <div className="login-screen">
            <Form className="login-form">
                { error && <label className="login-error-label"> { error } </label> }
                <Form.Field>
                    <label> Epost </label>
                    <input 
                        value={email} 
                        onChange={e => handleInput(e, setEmail)} 
                        type="email"
                        autoComplete="email"
                        />
                </Form.Field>
                <Form.Field>
                    <label> Passord </label>
                    <input 
                        value={password} 
                        onChange={e => handleInput(e, setPassword)} 
                        type="password"
                        autoComplete="current-password" 
                        />
                </Form.Field>
                <Button className="login-button" onClick={handleSubmit}> Logg inn </Button>
            </Form>
        </div>
    );
};

export default LoginScreen;
