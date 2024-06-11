import React, { useEffect } from 'react'
import '../../App.css';
import video from '../../assets/videologin.mp4';
import logo from '../../assets/logologin.png';
import { Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
          ...currentUser,
          [name]: value,
        }));
      };

      const handleLogin = async () => {
        const url = `http://localhost:1337/api/auth/local`;
        try {
          if (user.identifier && user.password) {
            const { data } = await axios.post(url, user);
            if (data.jwt) {
              storeUser(data);
              toast.success("Logged in successfully!", {
                hideProgressBar: true,
              });
              setUser(initialUser);
              navigate("/");
              window.location.reload();
            }
          }
        } catch (error) {
          toast.error(error.message, {
            hideProgressBar: true,
          });
        }
      };
  return (
    <div className="loginPage flex">
    <div className="container flex">
        <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
            <h2 className='title'> Create And Sell Extraordinary Products</h2>
            <p>We Plant</p>
            </div>

            <div className="footerDiv flex">
                <span className="text">Don't have an account?</span>
                <Link to={'/register'}>
                <button className='btn'>Sign Up</button>
                </Link>
            </div>
        </div>

    <div className="formDiv flex">
        <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
        </div>

        <form action="" className='form grid'>
            <span className='showMessage'>Login Status will go here</span>

            <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' />
                </div>
            </div>
            <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                <BsFillShieldLockFill  className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' />
                </div>
            </div>
            <button type='submit' className='btn flex'>
                <span>Login</span>
                <AiOutlineSwapRight className='icon'/>
            </button>

            <a href="/dashboard">DashBoard</a>

            <span className='forgotPassword'>
            Forgot your password? <a href="">Click Here</a>
            </span>

        </form>
    </div>
    </div>
    </div>
  )
}

export default Login
