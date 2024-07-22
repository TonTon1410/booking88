import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import userApi from '../api/userapi';
import { useNavigate } from 'react-router-dom';

function GGLogin() {
  const navigate = useNavigate();
  const loginGoogle = async (token) => {
    try {
      const res = await userApi.loginGoogle(token);
      console.log(res);
      if (res.user) {
        // If user object is returned, assume login is successful
        console.log('User created or logged in:', res.user);
        // Save user data or token as needed
        // For example, save token to localStorage
        localStorage.setItem('authToken', res.token);
        // Navigate to home page or dashboard
        navigate('/');
      } else {
        console.error('Login failed:', res);
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(); // Get Firebase ID token
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
