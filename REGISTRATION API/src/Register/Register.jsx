import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

const Register = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = { id, name, password, email, phone, address };

    fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regObj)
    }).then((res) => {
      if (res.ok) {
        toast.success('Registered successfully.');
        setTimeout(() => navigate('/login'), 2000); // Delay navigation to show success message
      } else {
        return res.json().then((error) => {
          throw new Error(error.message);
        });
      }
    }).catch((err) => {
      toast.error('Failed: ' + err.message);
    });
  }

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>User Name <span>*</span> </label>
                    <input value={id} onChange={e => setId(e.target.value)} className="form-control" required></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password <span>*</span> </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" required></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name <span>*</span> </label>
                    <input value={name} onChange={e => setName(e.target.value)} className="form-control" required></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email <span>*</span> </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" required></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone <span>*</span> </label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control" required></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address <span>*</span> </label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} className="form-control" required></textarea>
                  </div>
                </div>

                
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Register</button>
              <a className="btn btn-danger" href="/">Back</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
