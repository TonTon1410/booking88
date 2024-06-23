import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import userApi from '../api/userapi';

function GGLogin() {
  const loginGoogle = async (token) => {
    try {
      const res = await userApi.loginGoogle(token);
      console.log(res);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await loginGoogle(token);
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLoginGoogle}>Login with Google</button>
    </div>
  );
}

export default GGLogin;