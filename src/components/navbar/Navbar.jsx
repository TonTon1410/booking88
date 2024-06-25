import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import { CiMenuBurger, CiBitcoin } from "react-icons/ci";
import { login, logout, selectUser } from "../../redux/features/counterSlice";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const [dropdownActive, setDropdownActive] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate(); // Hook to navigate to different routes

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNavbar = () => {
    setActive("navBar");
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Navigate to the login page after logout
  };

  const handleProfile = () => {
    navigate("/userprofile"); // Navigate to the profile page
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a onClick={handleHomeClick} className="logo flex" style={{ cursor: "pointer" }}>
            <h1>
              <CiBitcoin className="icon" />
              Booking88
            </h1>
          </a>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/courtlist" className="navLink">
                Danh Sách Sân
              </a>
            </li>
            <li className="navItem">
              <a onClick={handleHomeClick} className="navLink" style={{ cursor: "pointer" }}>
                Bản Tin
              </a>
            </li>
            <li className="navItem">
              <a href="/contact" className="navLink">
                Liên Hệ
              </a>
            </li>
            {user && user.role === 'ADMIN' && (
              <li className="navItem">
                <a href="/dashboard" className="navLink">
                  Dashboard
                </a>
              </li>
            )}
            <div className="userDropdown" onClick={toggleDropdown}>
              <Avatar
                size="large"
                src={user.avatar}
                style={{ cursor: "pointer" }}
              />
              {dropdownActive && (
                <div className="dropdownMenu">
                  <button onClick={handleProfile}>Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>

            <button className="btn">
              <a href="/login">Book Now</a>
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
