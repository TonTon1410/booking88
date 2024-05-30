import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {Link} from 'react-router-dom';
import GGLogin from '../../api/GGlogin';
import classNames from "classnames";
import styles from "../login/LFR.module.css";
import UserApi from "../../api/UserApi.jsx";

const clientId = "533109554283-2fnqr3dfbr9egqpi3uqdcmhgk24651qj.apps.googleusercontent.com"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserApi.forgotPassword(email, password);
            console.log(response);
        } catch (err) {
            console.log("Login failed. Please check your credentials and try again.");
            console.error(err);
        }
    };
    return (
        <>
            <div>
                <section className={classNames(styles.container, styles.forms)}>
                    <div className={classNames(styles.form, styles.login)}>
                        <div className={styles["form-content"]}>
                            <header>GET ACCOUNT</header>
                            <form onSubmit={handleSubmit}>
                                <div className={classNames(styles.field, styles['input-field'])}>
                                    <input
                                        type="email"
                                        autoComplete="off"
                                        placeholder="Email or numberphone"
                                        className="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={classNames(styles.field, styles['input-field'])}>
                                    <input type="text" placeholder="code" className="code"></input>
                                </div>
                                <div className={classNames(styles.field, styles['input-field'])}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={classNames(styles.field, styles['input-field'])}>
                                    <input type="password" placeholder="Confirm password"
                                           className="passwordConfig"></input>
                                </div>
                                <div className={classNames(styles.field, styles['button-field'])}>
                                    <button>Get</button>
                                </div>
                            </form>
                            <div className={styles["form-link"]}>
                                <span>Come back <a href="#" className={classNames(styles.signup)}>
                                    <Link to="/login">Login</Link>
                                </a></span>
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        <div className={classNames(styles.field, styles['button-field'])}>
                            <GoogleOAuthProvider clientId={clientId}>
                                <GGLogin/>
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default ForgotPassword;