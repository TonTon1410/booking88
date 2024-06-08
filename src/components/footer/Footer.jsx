import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import Aos from "aos";
import { CiBitcoin } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";
import 'aos/dist/aos.css';

import './Footer.scss'
import pg from '../../assets/A.mp4';
const Footer = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className="footer">
            <div className="videoDiv">
                <video src={pg} loop autoPlay muted type="video/mp4" />
            </div>

            <div className="secContent container">
                {/* <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>Keep in touch</small>
                        <h2>Traval with us</h2>
                    </div>
                    <div className="inputDiv flex">
                        <input data-aos="fade-up" type="text" placeholder="Gửi gớp ý của bạn" />
                        <button data-aos="fade-up" className="btn flex" type="submit">
                            Gửi <IoIosSend className="icon" />
                        </button>
                    </div>
                </div> */}
                <div data-aos="fade-up" className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <CiBitcoin className="icon" /> BOOKING88.
                            </a>
                        </div>

                        <div className="footerParagraph flex">
                            information web?
                        </div>
                        <div data-aos="fade-up" className="footerSocials flex">
                            <SiGmail className="icon" />
                        </div>
                    </div>
                    <div className="footerLinks grid">

                        <div data-aos="fade-up" className="linkGroup">
                            <span className="groupTitle">
                                Out agency
                            </span>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Services
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Insurance
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Agency
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Tourism
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Payment
                            </li>
                        </div>


                        <div data-aos="fade-up" className="linkGroup">
                            <span className="groupTitle">
                                Out agency
                            </span>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Services
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Insurance
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Agency
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Tourism
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Payment
                            </li>
                        </div>

                        <div data-aos="fade-up" className="linkGroup">
                            <span className="groupTitle">
                                Out agency
                            </span>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Services
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Insurance
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Agency
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Tourism
                            </li>
                            <li className="footerList fees">
                                <MdNavigateNext className="icon" />
                                Payment
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>Trang web hỗ trợ đặt lịch sân cầu lông hàng đầu Việt Nam </small>
                        <small>© Project SWP391 - 2024</small>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Footer;