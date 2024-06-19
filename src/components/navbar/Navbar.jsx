import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiMenuBurger, CiBitcoin } from "react-icons/ci";
import { login, logout, selectUser } from "../../redux/features/counterSlice";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setaActive] = useState("navBar");
  const [dropdownActive, setDropdownActive] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate(); // Hook to navigate to different routes

  const showNav = () => {
    setaActive("navBar activeNavbar");
  };

  const removeNavbar = () => {
    setaActive("navBar");
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfile = () => {
    navigate("/userprofile"); // Navigate to the profile page
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
              </a>
            </li>
            <li className="navItem">
              <a href="courtlist" className="navLink">
                Danh Sách Sân
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Bản Tin
              </a>
            </li>
            <li className="navItem">
              <a href="Dashboard" className="navLink">
                Liên Hệ
              </a>
            </li>
            {user ? (
              <div className="userDropdown">
                <Avatar
                  size="large"
                  src={user.avatar}
                  onClick={toggleDropdown}
                />
                {dropdownActive && (
                  <div className="dropdownMenu">
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn">
                <a href="Login">Book Now</a>
              </button>
            )}
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
