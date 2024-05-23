import React, { useState } from 'react';
import './SignUpLogin.css';

import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import phone_icon from '../../assets/phone.png';
import google_icon from '../../assets/google.png'; // Thêm biểu tượng Google

const SignUpLogin = () => {
    const [action, setAction] = useState("Đăng Nhập");
    const [inputValue, setInputValue] = useState("");

    const handleGoogleSignIn = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id: '598819600423-tp8ku1bsnkc74ul3jfk2u9nclm7f08u7.apps.googleusercontent.com',
            });

            auth2.signIn().then(googleUser => {
                const profile = googleUser.getBasicProfile();
                console.log('ID: ' + profile.getId());
                console.log('Tên: ' + profile.getName());
                console.log('URL ảnh: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
                // Thực hiện các hành động cần thiết với thông tin người dùng
            });
        });
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const isEmail = (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    };

    const handleSubmit = () => {
        if (action === "Đăng Nhập") {
            if (isEmail(inputValue)) {
                console.log("Đăng nhập bằng Email:", inputValue);
                // Thực hiện logic đăng nhập bằng email
            } else {
                console.log("Đăng nhập bằng Số điện thoại:", inputValue);
                // Thực hiện logic đăng nhập bằng số điện thoại
            }
        } else {
            console.log("Đăng ký tài khoản mới");
            // Thực hiện logic đăng ký tài khoản mới
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Đăng Nhập" ? null : (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="Biểu tượng Người dùng" />
                            <input type="text" placeholder='Tên' />
                        </div>
                        <div className="input">
                            <img src={phone_icon} alt="Biểu tượng Điện thoại" />
                            <input type="text" placeholder='Số điện thoại' />
                        </div>
                    </>
                )}

                <div className="input">
                    <img src={email_icon} alt="Biểu tượng Email" />
                    <input type="text" placeholder='Email hoặc Số điện thoại' value={inputValue} onChange={handleInputChange} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Biểu tượng Mật khẩu" />
                    <input type="password" placeholder='Mật khẩu' />
                </div>
                {action === "Đăng Ký" && (
                    <div className="input">
                        <img src={password_icon} alt="Biểu tượng Mật khẩu" />
                        <input type="password" placeholder='Xác nhận Mật khẩu' />
                    </div>
                )}
            </div>
            {action === "Đăng Nhập" && (
                <div className="forgot-password">Quên mật khẩu? <span>Bấm vào đây</span></div>
            )}
            <div className="submit-container">
                <div className={action === "Đăng Nhập" ? "submit gray" : "submit"} onClick={() => { setAction("Đăng Ký") }}>Đăng Ký</div>
                <div className={action === "Đăng Ký" ? "submit gray" : "submit"} onClick={() => { setAction("Đăng Nhập") }}>Đăng Nhập</div>
            </div>
            <div className="submit login-button" onClick={handleSubmit}>{">"}</div>
            <div className="google-signin" onClick={handleGoogleSignIn}>
                <img src={google_icon} alt="Google Icon" />
                <span>{action} với Google</span>
            </div>
        </div>
    );
};

export default SignUpLogin;
