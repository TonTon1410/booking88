import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Login from './login/login.jsx';
import LoginGG from './login/loginGG.jsx';
import Signup from './signup/Signup.jsx';
import ForgotPassword from './forgotpassword/ForgotPassword.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/LoginGG' element={<LoginGG/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      </Routes>

    </Router>

  </React.StrictMode>,
)
