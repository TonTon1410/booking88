import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout"; // Đảm bảo đường dẫn chính xác đến MainLayout
import Home from "../components/home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../pages/Register/Register";
import PasswordRecovery from "../components/reset/PasswordRecovery";
import Main from "../components/main/Main";
import CourtList from "../components/CourtList";
import CourtDetails from "../components/CourtDetail";
import Booking11 from "../components/booking/Booking11";
import Login from "../pages/Login/Login";
import Payment from "../components/Payment/index";
// import ProtectedRoute from "./ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "courtlist",
        element: <CourtList />,
      },
      {
        path: "/dashboard",
        element: (
            <Dashboard />
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
        path: "/booking",
        element: <Booking11 />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      // {
      //   path: "",
      //   element: <div>404 Not Found</div>,
      // },
    ],
  },
]);

export default router;