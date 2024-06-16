import React, { useState } from 'react';
import '../../App.css';
import video from '../../assets/videologin.mp4';
import logo from '../../assets/logologin.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import CustomerControler from "../../api/userapi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const LoginService = async () => {
    try {
      const reposi = await CustomerControler.Login(email, password);
      if (reposi) {
        toast.success('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Delay for 2 seconds before navigating to dashboard
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginService();
  };

  return (
    <div className="loginPage flex">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className='title'>Create And Sell Extraordinary Products</h2>
            <p>We Plant</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to={'/register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>
          <form action="" className='form grid' onSubmit={handleSubmit}>
            <span className='showMessage'>Login Status will go here</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input
                  type="text"
                  id='username'
                  placeholder='Enter Username'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input
                  type="password"
                  id='password'
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon' />
            </button>
            <a href="/dashboard">DashBoard</a>
            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
