import React from "react";
import { AiFillDashboard, AiFillCode, AiFillSignal, AiFillContacts } from "react-icons/ai";
import { FaFirstOrderAlt, FaCreditCard, FaQuestion } from "react-icons/fa";
import { IoCompassOutline, IoDiamondOutline } from "react-icons/io5";

import style from '../sidebarection/Sidebar.module.scss';

// import img1 from '../../assets/anh.jpg'
// import img2 from '../../assets/anh2.jpg'
// import img3 from '../../assets/anh3.jpg'
// import img4 from '../../assets/anh4.jpg'
import logo from '../../assets/logo.jpg'

const Sidebar = () => {
    return (
        <div className={`${style.sideBar} ${style.grid}`}>
            <div className={`${style.logoDiv} ${style.flex}`}>
                <img src={logo} alt="Image Name" />
                <h2>Booking88</h2>
            </div>

            <div className={`${style.menuDiv}`}>
                <h3 className={`${style.divTitle}`}>
                    Quick Menu
                </h3>
                <ul className={`${style.menuLists} ${style.grid}`}>

                    <li className={`${style.listItem}`}>
                        <a href="userFile" className={`${style.menuLink} ${style.flex}`}>
                            <AiFillDashboard className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                Hồ Sơ
                            </span>
                        </a>
                    </li>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <FaFirstOrderAlt className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                Quản Lý Club
                            </span>
                        </a>
                    </li>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <IoCompassOutline className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                            Quản Lý Accounts
                            </span>
                        </a>
                    </li>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <IoDiamondOutline className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                Thống kê
                            </span>
                        </a>
                    </li>

                </ul>
            </div>


            <div className={`${style.menuDiv}`}>
                <h3 className={`${style.divTitle}`}>
                    Settings
                </h3>
                <ul className={`${style.menuLists} ${style.grid}`}>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <AiFillDashboard className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                Dashboard
                            </span>
                        </a>
                    </li>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <FaFirstOrderAlt className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                My Order
                            </span>
                        </a>
                    </li>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <IoCompassOutline className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                Exlore
                            </span>
                        </a>
                    </li>

                    <li className={`${style.listItem}`}>
                        <a href="" className={`${style.menuLink} ${style.flex}`}>
                            <IoDiamondOutline className={`${style.icon}`} />
                            <span className={`${style.smallText}`}>
                                Product
                            </span>
                        </a>
                    </li>

                </ul>
            </div>
            <div className={`${style.sideBarCard}`}>
                <FaQuestion className={`${style.icon}`} />
                <div className={`${style.cardContent}`}>
                    <div className={`${style.circle1}`}></div>
                    <div className={`${style.circle2}`}></div>
                    <h3>Help Conter</h3>
                    <p>Having trouble in Booking88, pleatact contact us from for more question.</p>
                    <button className={`${style.btn}`}>Go to help center</button>
                </div>

            </div>
        </div>
    )
}
export default Sidebar;