import React from "react";
import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Conten from "./components/main/Main.jsx";
import Footer from "./components/footer/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";
const App =() =>{
    return(
        <>
            <Navbar/>
            <Home/>
            <Conten/>
            <Footer/>
            {/* <Dashboard/> */}
        </>
    )
}

export default App
