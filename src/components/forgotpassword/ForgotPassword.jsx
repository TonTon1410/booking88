import React from 'react';
import '../login/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import GGLogin from '../../api/GGlogin';

const clientId = "533109554283-2fnqr3dfbr9egqpi3uqdcmhgk24651qj.apps.googleusercontent.com"
function Login() {
    return (
        <>
            <div>
                <section className="container forms">
                    <div className="form login">
                        <div className="form-content">
                            <header>GET ACCOUNT</header>
                            <form>
                                <div className="field input-field">
                                    <input type="email" placeholder="Email or numberphone" class="input"></input>
                                </div>
                                <div class="field input-field">
                                    <input type="text" placeholder="code" class="code"></input>
                                </div>
                                <div class="field input-field">
                                    <input type="password" placeholder="Password" class="password"></input>
                                </div>
                                <div class="field input-field">
                                    <input type="password" placeholder="Confirm password" class="passwordConfig"></input>
                                </div>
                                <div className="field button-field">
                                    <button>Get</button>
                                </div>
                            </form>
                            <div className="form-link">
                                <span>Come back <a href="#" className="link signup-link">
                                    <Link to="/login">Login</Link>
                                </a></span>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div className="field button-field">
                            <GoogleOAuthProvider clientId={clientId}>
                                <GGLogin />
                            </GoogleOAuthProvider>
                        </div>
                        {/* <Link to="/LoginGG" className="field google">
                                <i className="gg-google"></i>
                                <span>Login with Google</span>
                            </Link> */}
                    </div>
                </section>
            </div>
        </>
    );
}
export default Login;