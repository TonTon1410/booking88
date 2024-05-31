import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from '../login/login';
import styles from '../hearder/Hearder.module.css';
import LOGO from "../../assets/logo.jpg";

  function Tabbars() {
    return (
      <>
        <header className={styles.header}>
          <img src={LOGO} className={styles.logo} />
          <nav className="navbar">
            <Link to="/login" className={styles.login}>Home</Link>
            <Link to="/login" className={styles.login}>About</Link>
            <Link to="/login" className={styles.login}>Portfolio</Link>
            <Link to="/login" className={styles.login}>Services</Link>
            <Link to="/login" className={styles.login}>alo</Link>
            <Link to="/login" className={styles.login}>Login</Link>
            {/* <a.Link to="/login">Login</a.Link> */}
          </nav>
        </header>
      </>
    )
  }
export default Tabbars;