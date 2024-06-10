import React,{useEffect} from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";
import Aos from "aos";
import './Main.scss';
import 'aos/dist/aos.css';
import Img from "../../assets/img1.jpg";

const Data = [
    {
        id: 1,
        imgsrc: Img,
        destTitle: "San Cau long 1",
        location: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        grade: "grade",
        fees: "100.000vnd",
    },
    {
        id: 2,
        imgsrc: Img,
        destTitle: "San Cau long 2",
        location: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        grade: "grade",
        fees: "100.000vnd",
    },
    {
        id: 3,
        imgsrc: Img,
        destTitle: "San Cau long 3",
        location: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        grade: "grade",
        fees: "100.000vnd",
    },
    {
        id: 3,
        imgsrc: Img,
        destTitle: "San Cau long 3",
        location: "Ho Chi Minh",
        description: "Theo quy chuẩn quốc tế, sân cầu lông có kích thước chuẩn là 13,4m x 6,1m với độ dài đường chéo sân là 14,73m. Ngoài ra, với thiết kế sân đánh đơn, kích thước chuẩn của sân cầu lông sẽ là 13,4m x 5,18m với độ dài đường chéo sân là 14,38m",
        grade: "grade",
        fees: "100.000vnd",
    }
]
const Main = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({ id, imgsrc, destTitle, location, grade, fees, description }) => {
                        return (
                            <div key={id} data-aos="fade-up" className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgsrc} alt={destTitle} />
                                </div>
                                <div className="cardInfor">
                                    <h4 className="destTitle">{destTitle}</h4>
                                    <span className="container flex">
                                        <FaLocationDot className="icon" />
                                        <span className="name"> {location}</span>
                                    </span>
                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>{grade}<small>+1</small></span>
                                        </div>
                                        <div className="price">
                                            <h5>{fees}</h5>
                                        </div>
                                    </div>

                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>
                                    <button className="btn flex">
                                        Details 
                                        <CiStickyNote  className="icon" />
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