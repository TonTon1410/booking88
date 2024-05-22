function Signup() {
    return (
        <>
            <div className="container">
                <div className="forms-container">
                    <div className="form-control signin-form">
                        <form>
                            <h2>SignUp</h2>
                            <input placeholder="Username" required type="text" />
                            <input placeholder="Email" required type="email" />
                            <input placeholder="Password" required type="password" />
                            <input placeholder="Confirm password" required type="password" />
                            <button>Signup</button>
                        </form>
                        <span>or signup with</span>
                        {/* <div class="socials">
                            <i class="fab fa-facebook-f"></i>
                              <i class="fab fa-google-plus-g"></i>
                            <i class="fab fa-linkedin-in"></i>
                        </div> */}
                    </div>
                    <div className="intros-container">
                        <div className="intro-control signin-intro">
                            <div className="intro-control__inner">
                                <h2>Welcome back!</h2>
                                <p>
                                    Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe
                                    and enjoyable time away.
                                </p>
                                <button children="signup-btn">No account yet? Signup.</button>
                            </div>
                        </div>
                        <div className="intro-control signup-intro">
                            <div className="intro-control__inner">
                                <h2>Come join us!</h2>
                                <p>
                                    We are so excited to have you here.If you haven't already, create an account to get access to
                                    exclusive offers, rewards, and discounts.
                                </p>
                                <button id="signin-btn">Already have an account? Signin.</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup