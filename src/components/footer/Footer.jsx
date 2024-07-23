import React, { useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import Aos from "aos";
import { CiBitcoin } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";
import 'aos/dist/aos.css';

import './Footer.scss';
import logo from "../../assets/logologin.png";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={logo} loop autoPlay muted type="video/mp4" />
      </div>

      <div className="secContent container">
        <div data-aos="fade-up" className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <CiBitcoin className="icon" /> BOOKING88.
              </a>
            </div>

            <div className="footerParagraph">
              Booking88 is your go-to platform for reserving badminton courts. Our platform provides easy booking, comprehensive information about various courts, and excellent customer service.
            </div>
            
            <div data-aos="fade-up" className="footerSocials flex">
              <a href="mailto:booking88@gmail.com" className="socialLink">
                <SiGmail className="icon" />
              </a>
              <a href="https://www.facebook.com/yourpage" className="socialLink">
                <FaFacebookF className="icon" />
              </a>
              <a href="tel:+84123456789" className="socialLink">
                <FaPhoneAlt className="icon" />
              </a>
            </div>
          </div>
          
          <div className="footerLinks grid">
            <div data-aos="fade-up" className="linkGroup">
              <span className="groupTitle">Our Agency</span>
              <ul>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Services
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Insurance
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Agency
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Tourism
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Payment
                </li>
              </ul>
            </div>
            <div data-aos="fade-up" className="linkGroup">
              <span className="groupTitle">Badminton Courts</span>
              <ul>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Court Locations
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Booking Guidelines
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Pricing
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Facilities
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Customer Reviews
                </li>
              </ul>
            </div>
            <div data-aos="fade-up" className="linkGroup">
              <span className="groupTitle">Contact Us</span>
              <ul>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Address: 123 Đường ABC, Quận 9, Thành phố Hồ Chí Minh
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Phone: (+84) 123-456-789
                </li>
                <li className="footerList">
                  <MdNavigateNext className="icon" />
                  Email: booking88@gmail.com
                </li>
              </ul>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>Top platform for booking badminton courts in Vietnam</small>
            <small>© Project SWP391 - 2024</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
