import React, { useEffect } from "react";
import pg from '../../assets/A.mp4';
import { FaMapLocationDot } from "react-icons/fa6";
import { FaFilter, FaFacebook, FaInstagramSquare, FaListUl } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import Aos from "aos";

import './Home.scss'
import 'aos/dist/aos.css';

const Home = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className='home'>
            <div className='overlay'></div>
            <video src={pg} muted autoPlay loop type="video/mp4" />

            <div className="homeContent container">
                <div className="textDiv">
                    <span data-aos="fade-up" className="smallText">
                        OUR Package
                    </span>
                    <h1 data-aos="fade-up" className="homeTitle">
                        Search your Holiday
                    </h1>
                </div>


                <div data-aos="fade-up" className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">
                            Search your destination
                        </label>
                        <div className="input flex">
                            <input type="text"
                                placeholder="Enter name here ..." />
                            <FaMapLocationDot className="icon" />
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">
                            Select your date:
                        </label>
                        <div className="input flex">
                            <input type="date"
                                placeholder="Enter name here ..." />
                            <FaMapLocationDot className="icon" />
                        </div>
                    </div>

                    <div className="priceInput">
                        <div className="label_total flex">
                            <lable htmlFor="price">Max price:</lable>
                            <h3 className="total">$5000</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="5000" min="1000" />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <FaFilter className="icon" />
                        <span>More filters</span>
                    </div>
                </div>


                <div className="homeFooterIcons flex">
                    <div data-aos="fade-up" className="rightIcons">
                        <FaFacebook className="icon" />
                        <FaInstagramSquare className="icon" />
                    </div>
                    <div data-aos="fade-up" className="leftIcons">
                        <FaListUl className="icon" />
                        <TbApps className="icon" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Home;