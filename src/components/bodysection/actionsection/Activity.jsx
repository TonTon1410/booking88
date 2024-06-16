import React from "react";
import style from '../actionsection/Activity.module.scss';
import { BsArrowRightShort } from "react-icons/bs";
import anh11 from '../../../assets/anh11.jpg'
import anh12 from '../../../assets/anh12.jpg'
import anh13 from '../../../assets/anh13.jpg'
import anh14 from '../../../assets/anh14.jpg'

const Activity=()=>{
    return(
        <div className={`${style.activitySection}`}>
            <div className={`${style.heading} ${style.flex}`}>
                <h1>Resent Activity</h1>
                <button className={`${style.btn} ${style.flex}`} >
                    See All

                    <BsArrowRightShort className={`${style.icon}`} />
                </button>
            </div>
            <div className= {`${style.secContainer} ${style.grid}`}>
                <div className= {`${style.singleCustomer} ${style.flex}`}>
                    <img src={anh11} alt="Customer Image" />
                    <div className= {`${style.customerDetails}`}>
                        <span className={`${style.name}`}>Trung Hieu</span>
                        <small>Ordered a new booking</small>
                    </div>
                    <div className= {`${style.duration}`}>
                        2 min ago
                    </div>
                </div>

                <div className= {`${style.singleCustomer} ${style.flex}`}>
                    <img src={anh12} alt="Customer Image" />
                    <div className= {`${style.customerDetails}`}>
                        <span className={`${style.name}`}>Cao Diep</span>
                        <small>Ordered a new booking</small>
                    </div>
                    <div className= {`${style.duration}`}>
                        2 min ago
                    </div>
                </div>

                <div className= {`${style.singleCustomer} ${style.flex}`}>
                    <img src={anh13} alt="Customer Image" />
                    <div className= {`${style.customerDetails}`}>
                        <span className={`${style.name}`}>Nhat Truong</span>
                        <small>Ordered a new booking</small>
                    </div>
                    <div className= {`${style.duration}`}>
                        2 min ago
                    </div>
                </div>

                <div className= {`${style.singleCustomer} ${style.flex}`}>
                    <img src={anh14} alt="Customer Image" />
                    <div className= {`${style.customerDetails}`}>
                        <span className={`${style.name}`}>Van Toan</span>
                        <small>Ordered a new booking</small>
                    </div>
                    <div className= {`${style.duration}`}>
                        2 min ago
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Activity;