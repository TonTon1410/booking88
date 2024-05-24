import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Register from './components/Register/Register.jsx';
import Login from './components/login/login.jsx';
import Signup from './components/signup/Signup.jsx'
import ForgotPassword from './components/forgotpassword/ForgotPassword.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Register/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      </Routes>

    </Router>

  </React.StrictMode>,
)
