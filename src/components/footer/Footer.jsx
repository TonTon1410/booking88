import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
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

            <div className="footerParagraph flex">
              Thông tin web?
            </div>
            
            <div data-aos="fade-up" className="footerSocials flex">
              <a href="mailto:your-email@example.com" className="socialLink">
                <SiGmail className="icon" />
              </a>
              <a href="https://www.facebook.com/yourpage" className="socialLink">
                <FaFacebookF className="icon" />
              </a>
              <a href="tel:+1234567890" className="socialLink">
                <FaPhoneAlt className="icon" />
              </a>
            </div>
          </div>
          <div className="footerLinks grid">
            <div data-aos="fade-up" className="linkGroup">
              <span className="groupTitle">
                Our agency
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
              <li className="footerList fees">
                <MdNavigateNext className="icon" />
                <a href="https://www.google.com/maps/place/FPT+University" target="_blank" rel="noopener noreferrer">
                  FPT University Map
                </a>
              </li>
            </div>
            <div data-aos="fade-up" className="mapGroup">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6358562389224!2d106.6799833153142!3d10.762912292327595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292920df659f%3A0x58b4180a2b0a508e!2sFPT+University!5e0!3m2!1sen!2s!4v1595400140861!5m2!1sen!2s" 
                width="600" 
                height="450" 
                frameBorder="0" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                aria-hidden="false" 
                tabIndex="0"
              ></iframe>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>Trang web hỗ trợ đặt lịch sân cầu lông hàng đầu Việt Nam</small>
            <small>© Project SWP391 - 2024</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
