import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Login from './components/login/login.jsx';
import LoginGG from './components/login/loginGG.jsx';
import Signup from './components/signup/Signup.jsx'
import ForgotPassword from './components/forgotpassword/ForgotPassword.jsx';
import SignUpLogin from './components/SignUpLogin/SignUpLogin.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/LoginGG' element={<LoginGG/>}/>
        {/* <Route path='/Signup' element={<Signup/>}/> */}
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/Signup' element={<SignUpLogin/>}/>
      </Routes>

    </Router>

  </React.StrictMode>,
)
