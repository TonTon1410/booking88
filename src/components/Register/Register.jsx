import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [Phone, phonehange] = useState("");
  const [address, addresschange] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj={id,name,password,email,Phone,address};
    //console.log(regobj);

    fetch("http://localhost:8000/user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regobj)
    }).then((res) => {
      toast.success('Registered successfully.');
    }).catch((err) => {
      toast.error('Failed: ' + err.message);
    });
    
  }
  return (
    <div>
      <div className="offset-lg-3  col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group"></div>
                  <label>User Name <span>*</span> </label>
                  <input value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                </div>

                <div className="col-lg-6">
                  <div className="form-group"></div>
                  <label>Password <span>*</span> </label>
                  <input  value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
                </div>

                <div className="col-lg-6">
                  <div className="form-group"></div>
                  <label>Full Name <span>*</span> </label>
                  <input  value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                </div>

                <div className="col-lg-6">
                  <div className="form-group"></div>
                  <label>Email <span>*</span> </label>
                  <input  value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                </div>

                <div className="col-lg-6">
                  <div className="form-group"></div>
                  <label>Phone  <span>*</span> </label>
                  <input  value={Phone} onChange={e=>phonehange(e.target.value)} className="form-control"></input>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>address <span>*</span> </label>
                    <textarea  value={address} onChange={e=>addresschange(e.target.value)} className="form-control"></textarea>
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
