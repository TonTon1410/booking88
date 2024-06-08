import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";
import axios from "axios";
import Aos from "aos";
import './Main.scss';
import 'aos/dist/aos.css';
import Img from "../../assets/img1.jpg";
import locationControler from "../../api/locationControler";

const Data = [
    {
        id: 1,
        imgsrc: Img,
        name: "San Cau long 1",
        address: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        status: "grade",
        hotline: "100.000vnd",
    },
    {
        id: 2,
        imgsrc: Img,
        name: "San Cau long 2",
        address: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        grade: "grade",
        hotline: "100.000vnd",
    },
    {
        id: 3,
        imgsrc: Img,
        name: "San Cau long 3",
        address: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        status: "grade",
        hotline: "100.000vnd",
    },
    {
        id: 4,
        imgsrc: Img,
        name: "San Cau long 3",
        address: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        status: "grade",
        hotline: "100.000vnd",
    }
]

const Main = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const [Data1, setData1] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const location = await locationControler.getAllLocation();
            setData1(location);
            console.log(location);
        };
        fetch();
    }, []);


    return (
        <section className="main container section">
            <div className="secTitle">
                <h2 data-aos="fade-right" className="title">
                    Typical badminton courts
                </h2>
            </div>

            <div className="secContent grid">
                {
                    Data1.map(({ id, imgsrc, name, address, hotline, description, openingtime, closingtime, status }) => {
                        return (
                            <div key={id} data-aos="fade-up" className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgsrc || Img} alt={name} />
                                </div>
                                <div className="cardInfor">
                                    <h4 className="destTitle">{name}</h4>
                                    <span className="container flex">
                                        <FaLocationDot className="icon" />
                                        <span className="name">{address}</span>
                                    </span>
                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>Open time:<br /><small>{openingtime} - {closingtime}</small></span>
                                        </div>
                                        <div className="price">
                                            <span>hotline:
                                                <h5>{hotline}</h5> </span>
                                        </div>
                                    </div>

                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>
                                    <button className="btn flex">
                                        Details
                                        <CiStickyNote className="icon" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
export default Main;