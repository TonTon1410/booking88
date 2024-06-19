import React from "react";
// import style from'../components/Dashboard.module.scss';
import Sidebar from "./sidebarection/Sidebar";
import Body from "./bodysection/Body";

const Dashboard = () => {
  return (
    // <div className={`${style.dashboard} ${style.flex}`}>
    //   <div className={`${style.dashboardContainer} ${style.flex}`}>
    <>
      <Sidebar />
      <Body />
    </>
    //   </div>
    // </div>
  );
};
export default Dashboard;
