import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function GGLogin() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="field button-field"/>
        </div>
    )
}
export default GGLogin;