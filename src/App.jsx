import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './home/home'
import Login_api from './Login/Login'
import Register from './Register/Register'
import { ToastContainer } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';

//// ông impỏt thư vien nay bằng npm á "react-toastify


function App() {
  return (
    <>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />;
    </>
  )
}

export default App
