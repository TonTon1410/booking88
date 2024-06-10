import React from "react";
import style from'../listingsection/Listing.module.scss';
import { BsArrowRight } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import anh2 from '../../../assets/anh2.jpg'
import anh3 from '../../../assets/anh3.jpg'
import anh4 from '../../../assets/anh4.jpg'
import { AiOutlineHeart } from "react-icons/ai";
import anh5 from '../../../assets/anh5.jpg'
import anh6 from '../../../assets/anh6.jpg'
import anh7 from '../../../assets/anh7.jpg'
import anh8 from '../../../assets/anh8.jpg'
import anh9 from '../../../assets/anh9.jpg'
// import anh10 from '../../../assets/anh10.jpg'





const Listing=()=>{
    return(
       <div className={`${style.lisitingSection}`}>

            <div className={`${style.heading} ${style.flex}`}>
      
            <h1>My Listing</h1>
            <button className={`${style.btn} ${style.flex}`}>
                See All <BsArrowRight className={`${style.icon}`}/>
            </button>
        </div>

        <div className={`${style.secContainer} ${style.flex}`}>
            <div className={`${style.singleItem}`}>
            <AiFillHeart className={`${style.icon}`}/>
            <img src={anh2}alt="Image Name" />
            <h3>Trung Hieu</h3>
            </div>

            <div className={`${style.singleItem}`}>
            <AiOutlineHeart 
            className={`${style.icon}`}/>
            <img  src={anh3}alt="Image Name" />
            <h3>Cao Diep</h3>
            </div>

            <div className={`${style.singleItem}`}>
            <AiOutlineHeart
            className={`${style.icon}`}/>
            <img  src={anh4}alt="Image Name" />
            <h3>Nhat Truong</h3>
            </div>

            <div className={`${style.singleItem}`}>
            <AiOutlineHeart
            className={`${style.icon}`}/>
            <img src={anh5}alt="Image Name" />
            <h3>Van Toan</h3>
            </div>

        </div>

        <div className={`${style.booking} ${style.flex}`}>
            <div className={`${style.topBooking}`}>
                <div className={`${style.heading} ${style.flex}`}>
                    <h3>Top Booking</h3>
                    <button className={`${style.btn} ${style.flex}`}>
                See All <BsArrowRight className={`${style.icon}`}/>
                    </button>
                </div>

                <div className={`${style.card} ${style.flex}`}>
                    <div className={`${style.users}`}>
                        <img src={anh6} alt="User Image" />
                        <img src={anh7} alt="User Image" />
                        <img src={anh8} alt="User Image" />
                        <img src={anh9} alt="User Image" />

                    </div>
                    <div className={`${style.cardText}`}>
                        <span>
                            TOP UserBooking <br />
                            <small>
                            20 User Booking<span className={`${style.date}`}> 40 lần</span>
                            </small>
                        </span>
                    </div>
                </div>
            </div>

             <div className={`${style.featuredBooking}`}>
                <div className={`${style.heading} ${style.flex}`}>
                    <h3>Featured Booking</h3>
                    <button className={`${style.btn} ${style.flex}`}>
                See All <BsArrowRight className={`${style.icon}`}/>
                    </button>
                </div>

                <div className={`${style.card} ${style.flex}`}>
                    <div className={`${style.users}`}>
                        <img src={anh6} alt="User Image" />
                        <img src={anh7} alt="User Image" />
                        <img src={anh8} alt="User Image" />
                        <img src={anh9} alt="User Image" />

                    </div>
                    <div className={`${style.cardText}`}>
                        <span>
                            TOP UserBooking <br />
                            <small>
                                100 User Booking<span className={`${style.date}`}> 50 LẦN</span>
                            </small>
                        </span>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}
export default Listing;