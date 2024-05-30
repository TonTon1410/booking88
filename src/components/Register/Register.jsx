import {useState} from "react";
import UserApi from "../../api/UserApi.jsx";

function Register() {
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
        <div>
            <div className="offset-lg-3  col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group"></div>
                                    <label>User Name <span>*</span> </label>
                                    <input value="" className="form-control"></input>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group"></div>
                                    <label>Password <span>*</span> </label>
                                    <input value="" type="password" className="form-control"></input>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group"></div>
                                    <label>Full Name <span>*</span> </label>
                                    <input value="" className="form-control"></input>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group"></div>
                                    <label>Email <span>*</span> </label>
                                    <input value="" className="form-control"></input>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group"></div>
                                    <label>Phone <span>*</span> </label>
                                    <input value="" className="form-control"></input>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>address <span>*</span> </label>
                                        <textarea value="" className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <a className="btn btn-danger">Back</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
