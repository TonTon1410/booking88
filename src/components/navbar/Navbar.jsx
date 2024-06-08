import {useState} from "react";
import './Navbar.scss'
import {AiFillCloseCircle} from "react-icons/ai";
import {CiMenuBurger,CiBitcoin} from "react-icons/ci";


const Navbar = () => {

    const [active, setaActive] = useState('navBar');


    const showNav = () => {
        setaActive('navBar activeNavbar');
    }

    const removeNavbar = () => {
        setaActive('navBar');
    }
    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <h1><CiBitcoin  className="icon"/>BOOKING88</h1>
                    </a>
                </div>
                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="#" className="navLink">Home</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Packages</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Shop</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">About</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Pages</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">News</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Contact</a>
                        </li>
                        <button className="btn">
                            <a href="#">LOGIN</a>
                        </button>
                    </ul>
                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon"/>
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <CiMenuBurger className="icon"/>
                </div>

            </header>
        </section>
    )
}
export default Navbar;