import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import userApi from './UserApi';

function GGLogin() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const loginGoogle = async (token) =>{
        try {
            const res = await userApi.loginGoogle(token);
            console.log(res)
        } catch (error) {
           console.log(error) 
        }
    }

    const  handleLoginGoogle = async () => {
    await signInWithPopup(auth, provider)
    .then((result) => {
    const token = result.user.accessToken; 
    loginGoogle(token)

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

    }

    return (
        <div>
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="field button-field"/> */}
            <button onClick={handleLoginGoogle}>Login google</button>
        </div>
    )
}
export default GGLogin;