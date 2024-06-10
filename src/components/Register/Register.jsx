import React, { useState } from 'react';
import '../../App.css';
import video from '../../assets/videologin.mp4';
import logo from '../../assets/logologin.png';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Tiến hành đăng ký nếu mật khẩu khớp
    setError('');
    // Thêm logic đăng ký ở đây
  };

  return (
    <div className="registerPage flex">
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
                <input required type="text" id='email' placeholder='Nhập Email' />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">Số Điện Thoại</label>
              <div className="input flex">
                <FaPhoneAlt className='icon'/>
                <input required type="text" id='username' placeholder='Điền Số Điện Thoại' />
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

            <div required  className="inputDiv">
              <label htmlFor="role">Vai Trò</label>
              <div className="input flex">
                <select  id="role" name="role" className="styledSelect" defaultValue="">
                  <option value="" disabled hidden></option>
                  <option value="NguoiChoi">Người Chơi</option>
                  <option value="NguoiDangKiChoThueSan">Người Đăng Kí Cho Thuê Sân</option>
                </select>
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
