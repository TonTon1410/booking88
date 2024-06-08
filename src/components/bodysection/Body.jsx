import React from "react";
import styles from './../bodysection/Body.module.scss';
import Top from "./topsection/Top";
import Listing from "./listingsection/Listing";
import Activity from "./actionsection/Activity";

const Body = () => {
    return (
        <div className={`${styles.mainContent}`}>
            <Top />
            <div className={`${styles.bottom} ${styles.flex}`}>
                <Listing />
                <Activity />
            </div>
        </div>
    )
}
export default Body;