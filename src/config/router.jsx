import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../components/home/Home";
import Footer from "../components/footer/Footer";
import Dashboard from "../components/Dashboard";

import Register from "../pages/Register/Register";
import PasswordRecovery from "../components/reset/PasswordRecovery";
import Main from "../components/main/Main";
import CourtList from "../components/CourtList";
import CourtDetails from "../components/CourtDetail";
import Booking11 from "../components/booking/Booking11";
import Login from "../pages/Login/Login";
import UserProfile from "../components/User/UserProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <Main />
          </>
        ),
      },
      {
        path: "/courtlist",
        element: <CourtList />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },

  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/userFile",
    element: <Dashboard />,
  },
  {
    path: "/PasswordRecovery",
    element: <PasswordRecovery />,
  },

  {
    path: "/court-details",
    element: <CourtDetails />,
  },
  {
    path: "/userprofile",
    element: <UserProfile />,
  },
  {
    path: "/booking",
    element: (
      
       
        <Booking11 />
     
    ),
  },

  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
