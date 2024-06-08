import React from "react";
import styles from'../components/Dashboard.module.scss';
import Sidebar from "./sidebarection/Sidebar";
import Body from "./bodysection/Body";

const Dashboard=()=>{
    return(
        <div className={`${styles.container}`}>
            <Sidebar/>
            <Body/>
        </div>
    )
}
export default Dashboard;