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
import ManageStaff from '../Dashboard/ManageStaff.jsx';
import CreateNewField from '../Dashboard/CreateNewField.jsx';
import UpdateFieldList from '../Dashboard/UpdateFieldList.jsx';
import ClubStaffManageFields from '../Dashboard/ClubStaffManageFields.jsx';
import Statistics from '../Dashboard/Statistics.jsx'; // Thêm đường dẫn tới component Statistics
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice";
import AccountList from '../Dashboard/AccountList.jsx';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (user && ['ADMIN', 'CLUB_STAFF'].includes(user.role)) {
    return children;
  } else {
    return <div>Access Denied</div>;
  }
};

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
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [

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
          {
            path: 'statistics',
            element: <Statistics />, // Thêm đường dẫn cho Statistics
          },
          {
            path: 'manage-fields',
            element: <ClubStaffManageFields />, // Thêm đường dẫn cho ClubStaffManageFields
          },
          {
            path: 'account-list',
            element: <AccountList />, // Thêm mục này
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
