import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import video from '../../assets/videologin.mp4';
import logo from '../../assets/logologin.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://157.230.43.225:8080/register', { // Thay bằng endpoint thực sự của bạn
        email,
        phone,
        password,
        role,
      });
      console.log(response);

      if (response.status === 200) {
        setSuccess('Registration successful!');
        setError('');
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Delay for 2 seconds before navigating to login
      } else {
        setError('Registration failed. Please try again.');
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="registerPage flex">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'> Create And Sell Extraordinary Products</h2>
            <p>We Plant</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Have an account?</span>
            <Link to={'/login'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Let Us Know You!</h3>
          </div>

          <form action="" className='form grid' onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input
                  required
                  type="email"
                  id='email'
                  placeholder='Nhập Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="phone">Số Điện Thoại</label>
              <div className="input flex">
                <FaPhoneAlt className='icon'/>
                <input
                  required
                  type="text"
                  id='phone'
                  placeholder='Điền Số Điện Thoại'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Mật Khẩu</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input
                  required
                  type="password"
                  id='password'
                  placeholder='Nhập Mật Khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu </label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input
                  required
                  type="password"
                  id='confirmPassword'
                  placeholder='Nhập Lại Mật Khẩu'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
