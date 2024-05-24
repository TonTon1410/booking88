import React from 'react';
import '../login/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import GGLogin from '../../api/GGlogin';

const clientId="533109554283-2fnqr3dfbr9egqpi3uqdcmhgk24651qj.apps.googleusercontent.com"
function Login() {
    return (
        <>
            <div>
                <section className="container forms">
                    <div className="form login">
                        <div className="form-content">
                            <header>Login</header>
                            <form>
                                <div className="field input-field">
                                    <input type="email" placeholder="Email or numberphone" class="input"></input>
                                </div>
                                <div class="field input-field">
                                    <input type="password" placeholder="Password" class="password"></input>
                                </div>
                                <div className="form-link">
                                    <a href="#" className="forgot-pass">
                                        <Link to="/ForgotPassword">Forgot password?</Link>
                                    </a>
                                </div>
                                <div className="field button-field">
                                    <button>Login</button>
                                </div>
                            </form>
                            <div className="form-link">
                                <span>Don't have an account? <a href="#" className="link signup-link">
                                    <Link to="/Signup">Signup</Link>
                                </a></span>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div className="field button-field">
                            <GoogleOAuthProvider clientId={clientId}>
                                <GGLogin/>
                            </GoogleOAuthProvider>
                            {/* <Link to="/LoginGG" className="field google">
                                <i className="gg-google"></i>
                                <span>Login with Google</span>
                            </Link> */}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Login;