// src/components/Home/Home.js
import React, { useEffect } from "react";
import { Carousel } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
// import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import img1 from "../../assets/1.jpeg";
import img2 from "../../assets/2.jpeg";
import img3 from "../../assets/3.jpeg";
import img4 from "../../assets/4.jpeg";

const Home = () => {
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="home">
      <div className="overlay"></div>
      <div className="imageSlider">
        <Carousel autoplay autoplaySpeed={1000}>
          <div>
            <img src={img1} alt="Destination 1" />
          </div>
          <div>
            <img src={img2} alt="Destination 2" />
          </div>
          <div>
            <img src={img3} alt="Destination 3" />
          </div>
          <div>
            <img src={img4} alt="Destination 4" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Home;
