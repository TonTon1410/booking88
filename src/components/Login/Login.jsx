import React from 'react'
import '../../App.css';
import video from '../../assets/videologin.mp4';
import logo from '../../assets/logologin.png';
import { Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="loginPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    <div className="textDiv">
                        <h2 className='title'>Create And Sell Extraordinary Products</h2>
                        <p>We Plant</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Bạn chưa có tài khoản?</span>
                        <Link to={'/register'}>
                            <button className='btn'>Đăng kí</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Đăng nhập</h3>
                    </div>

                    <form action="" className='form grid'>
                        <div className="inputDiv">
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='username' placeholder='Email của bạn' />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id='password' placeholder='Nhập mật khẩu' />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Đăng nhập</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>

                        <Link to="/">Trở về trang chủ</Link>

                        <span className='forgotPassword'>
                            Quên mật khẩu? <Link to="/forgotPassword">Bấm đây</Link>
                        </span>

                        <div className="or">Hoặc</div>

                        <button type='button' className='btn google-btn flex'>
                            <FcGoogle className='icon' />
                            <span>Đăng nhập với Google</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
