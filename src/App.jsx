import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Conten from "./components/main/Main.jsx";
import Footer from "./components/footer/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import Profile from "./components/profile/Profile.jsx";
import {
    createBrowserRouter,
    Link,
    RouterProvider
  } from 'react-router-dom';
import { Profiler } from 'react';
  
  const router = createBrowserRouter([
    // {
    //   path: '/',
    //   element: (
    //     <div>
    //       <h1>Home Page</h1>
    //       <nav>
    //         <Link to="/login">To Login</Link> |{" "}
    //         <Link to="/register">To Register</Link> |{" "}
    //         <Link to="/dashboard">To Dashboard</Link>
    //       </nav>
    //     </div>
    //   )
    // },
    {
      path: '/',
      element: <div>
        <Navbar/>
        <Home />
        <Conten/>
        <Footer/>
        </div>
    },
    {
      path: '/dashboard',
      element: <div><Dashboard /></div>
    },
    {
      path: '/login',
      element: <div><Login /></div>
    },
    {
      path: '/register',
      element: <div><Register /></div>
    },

    {
      path: '/profile',
      element: <div>< Profile /></div>
    },
        {
      path: '*',
      element: <div>404 Not Found</div>
    },


  ])
  
  const App=()=> {
  
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    );
  }
export default App
