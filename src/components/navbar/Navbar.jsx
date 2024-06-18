import { useState } from "react";
import "./Navbar.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiMenuBurger, CiBitcoin } from "react-icons/ci";


const Navbar = () => {
  const [active, setaActive] = useState("navBar");

  const showNav = () => {
    setaActive("navBar activeNavbar");
  };

  const removeNavbar = () => {
    setaActive("navBar");
  };

  
  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1>
              <CiBitcoin className="icon" />
              BOOKING88
            </h1>
          </a>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            
            {/* <li className="navItem">
              <a href="#" className="navLink">
                User
              </a>
              <div className="show-up">
                <ul>
                    <li>Profile</li>
                    <li>Payment</li>
                    <li>Booking</li>
                </ul>
            </div>
            </li>
            
             */}
            
            <li className="navItem">
              <a href="register" className="navLink">Register</a>
            </li>
            <li className="navItem">
              <a href="UserProfile" className="navLink">Dịch vụ</a>
            </li>
            <li className="navItem">
              <a href="Dashboard" className="navLink">Dashboard</a>
            </li>
            <button className="btn">
              <a href="Login">Đăng nhập</a>
            </button>
          </ul>
          <div onClick={removeNavbar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <CiMenuBurger className="icon" />
        </div>
      </header>
    </section>
  );
};
export default Navbar;
