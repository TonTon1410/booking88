 import React from "react";
import { CiSearch } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";

import img from '../../../assets/anh.jpg'
import A from '../../../assets/A.mp4'
import style from '../topsection/Top.module.scss';

const Top = () => {
    return (
        <div className={`${style.topSection}`}>
            <div className={`${style.headerSection} ${style.flex}`}>
                <div className={`${style.title}`}>
                    <h1>Welcome to Pranti</h1>
                    <p>Hello IsraTech, Welcome back!</p>
                </div>

                <div className={`${style.searchBar} ${style.flex}`}>
                    <input type="text" placeholder="Search" />
                    <CiSearch className={`${style.icon}`} />
                </div>

                <div className={`${style.adminDiv} ${style.flex}`}>
                    <LuMessagesSquare className={`${style.icon}`} />
                    <IoIosNotificationsOutline className={`${style.icon}`} />
                    <div className={`${style.adminImage}`}>
                        <img src={img} alt="Admin Image" />
                    </div>
                </div>
            </div>

            <div className={`${style.cardSection} ${style.flex}`}>
                <div className={`${style.rightCard} ${style.flex}`}>
                    <h1>
                        Create and sell extraordinary products
                    </h1>
                    <p>
                        The world fast growing industry today are natural made products!
                    </p>
                    <div className={`${style.buttons} ${style.flex}`}>
                        <button className={`${style.btn}`}>Explore More</button>
                        <button className={`${style.btn} ${style.transparent}`}>Top Sellers</button>
                    </div>

                    <div className={`${style.videoDiv}`}>
                        <video src={A} autoPlay loop muted></video>
                    </div>
                </div>

                <div className={`${style.leftCard} ${style.flex}`}>
                    <div className={`${style.main} ${style.flex}`}>
                        <div className={`${style.textDiv}`}>
                            <h1>My Stat</h1>
                            <div className={`${style.flex}`}>
                                <span>
                                    Today <br />
                                    <small>4 Oreder</small>
                                </span>
                                <span>
                                    This Month <br />
                                    <small>100 Oreder</small>
                                </span>
                            </div>
                               
                            <span className={`${style.flex} ${style.link}`}>
                                Go to my order  <GrLinkNext className={`${style.icon}`}/>
                            </span>
                        </div>
                        <div className={`${style.imgDiv}`}>
                            <img src={img} alt="Image Name"/>
                        </div>
                  


                        {/* {xài sau} */}
                        {/* <div className={`${style.sideBarCard}`}>
                        <FaQuestion className={`${style.icon}`} />
                        <div className={`${style.cardContent}`}>
                            <div className={`${style.circle1}`}></div>
                            <div className={`${style.circle2}`}></div>
                            <h3>Help Conter</h3>
                            <p>Having trouble in Booking88, pleatact contact us from for more question.</p>
                            <button className={`${style.btn}`}>Go to help center</button>
                        </div>

            </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Top;