import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout"; // Đảm bảo đường dẫn chính xác đến MainLayout
import Home from "../components/home/Home";
import Register from "../pages/Register/Register";
import PasswordRecovery from "../components/reset/PasswordRecovery";
import Main from "../components/main/Main";
import CourtList from "../components/CourtList";
import CourtDetails from "../components/CourtDetail";
import Booking11 from "../components/booking/Booking11";
import Login from "../pages/Login/Login";
import Payment from "../components/Payment/index";
import UserProfile from '../components/UserProfile/UserProfile.jsx';
import Dashboard from "../Dashboard/Dashboard.jsx";
import Category from '../Dashboard/Category.jsx';
import ManageFields from '../Dashboard/ManageFields.jsx';
import ManageStaff from '../Dashboard/ManageStaff.jsx';
import CreateNewField from '../Dashboard/CreateNewField.jsx';
import UpdateFieldList from '../Dashboard/UpdateFieldList.jsx';

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
        path: "/courtlist",
        element: <CourtList />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'category',
            element: <Category />,
          },
          {
            path: 'all-fields',
            element: <ManageFields />,
          },
          {
            path: 'staffs',
            element: <ManageStaff />,
          },
          {
            path: 'UserProfile',
            element: <UserProfile />,
          },
          {
            path: 'create-new-field',
            element: <CreateNewField />,
          },
          {
            path: 'update-field',
            element: <UpdateFieldList />,
          },
        ],
      },
      {
        path: "/UserProfile",
        element: <UserProfile />,
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
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

export default router;
