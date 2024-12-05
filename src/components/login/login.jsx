import { useState } from "react";
import styles from "./LFR.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";
import GGLogin from "../../api/GGlogin.jsx";
import UserApi from "../../api/UserApi.jsx";

const clientId = "533109554283-2fnqr3dfbr9egqpi3uqdcmhgk24651qj.apps.googleusercontent.com";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const data = { email, password };
            const response = await UserApi.login(email, password);
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
                            <header>Login</header>
                            <form onSubmit={handleSubmit}>
                                <div className={classNames(styles.field, styles["input-field"])}>
                                    <input
                                        type="email"
                                        autoComplete="off"
                                        placeholder="Email or numberphone"
                                        className="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={classNames(styles.field, styles["input-field"])}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles["form-link"]}>
                                    <Link to="/ForgotPassword" className="forgot-pass">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className={classNames(styles.field, styles["button-field"])}>
                                    <button type="submit">Login</button>
                                </div>
                            </form>
                            <div className={styles["form-link"]}>
                <span>
                  Dont have an account?{" "}
                    <Link to="/Signup" className={classNames(styles.signup)}>
                    Signup
                  </Link>
                </span>
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        <div className={classNames(styles.field, styles["button-field"])}>
                            <GoogleOAuthProvider clientId={clientId}>
                                <GGLogin />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Login;
