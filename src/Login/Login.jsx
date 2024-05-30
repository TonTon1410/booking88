import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Đảm bảo import CSS của toastify
import "./Login.css";
import axios from "axios";
import api from "../config/axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const ProceedLogin = async (e) => {
    e.preventDefault();

      const response = await api.post("/login",{ phone: username, password:password })
      
      console.log(response.data)


  };

  const validate = () => {
    let result = true;
    if (!username) {
      result = false;
      toast.warning('Vui lòng nhập tên người dùng');
    }
    if (!password) {
      result = false;
      toast.warning('Vui lòng nhập mật khẩu');
    }
    return result;
  }

  return (
    <>
      <ToastContainer />
      <div className="row">
        <div>
          <form onSubmit={ProceedLogin} className="container">
            <div className="card">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>User Name</label>
                  <input required value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="btn btn-success" to={'/register'}>New User</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
