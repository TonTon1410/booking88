import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout"; // Đảm bảo đường dẫn chính xác đến MainLayout
import Home from "../components/home/Home";
import Register from "../pages/Register/Register";
import PasswordRecovery from "../components/reset/PasswordRecovery";
import PasswordReset from "../components/reset/PasswordReset";
import Main from "../components/main/Main";
import CourtList from "../components/CourtList";
import CourtDetails from "../components/CourtDetail";
import Login from "../pages/Login/Login";
import Payment from "../components/Payment/index";
import UserProfile from "../components/UserProfile/UserProfile.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import ManageStaff from "../Dashboard/ManageStaff.jsx";
import CreateNewField from "../Dashboard/CreateNewField.jsx";
import UpdateFieldList from "../Dashboard/UpdateFieldList.jsx";
import ClubStaffManageFields from "../Dashboard/ClubStaffManageFields.jsx";
import Statistics from "../Dashboard/Statistics.jsx"; // Thêm đường dẫn tới component Statistics
import AccountList from "../Dashboard/AccountList.jsx";

import AccountStaff from "../Dashboard/Owner/AccountStaff.jsx";
import ManagerField from "../Dashboard/Owner/ManagerField.jsx";
import LocationDetail from "../Dashboard/Owner/LocationDetail.jsx";
import HistoryBooking from "../Dashboard/Owner/HistoryBooking.jsx";


import News from "../components/News/News.jsx";
import Contact from "../components/Contact/Contact.jsx";
import Promotion from "../components/promotion/index.jsx";
import Overview from "../components/overview/index.jsx";
import History from "../components/history/index.jsx";
import CheckIn from "../components/checkin";
import Register_owner from "../pages/Register/Register_owner.jsx";
import PaymentSuccess from "../components/Payment/PaymentSuccess.jsx";
import FieldAdmin from "../Dashboard/FieldAdmin.jsx";
const router = createBrowserRouter([
  {
    path: "/",element: <MainLayout />,children: [
      {path: "/",element: (
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
        path: "/UserProfile",
        element: <UserProfile />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "register_owner",
        element: < Register_owner/>,
      },

      {
        path: "PasswordRecovery",
        element: <PasswordRecovery />,
      },
      {
        path: "reset-password",
        element: <PasswordReset />,
      },
      {
        path: "court-details/:id",
        element: <CourtDetails />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment_success",
        element: <PaymentSuccess />,
      },
      {
        path: "News",
        element: <News />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },

    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },

      {
        path: "staffs",
        element: <ManageStaff />,
      },
      {
        path: "ManagerField",
        element: <ManagerField />,
      },
      {
        path: "LocationDetail",
        element: <LocationDetail />,
      },
      {
        path: "create-new-field",
        element: <CreateNewField />,
      },
      {
        path: "update-field",
        element: <UpdateFieldList />,
      },
      {
        path: "FieldAdmin",
        element: <FieldAdmin />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "manage-fields",
        element: <ClubStaffManageFields />,
      },
      {
        path: "account-list",
        element: <AccountList />,
       
      },
      {path: "account-staff",element: <AccountStaff />,},
      {
        path: "promotion",
        element: <Promotion />,
      },
      {
        path: "checkin",
        element: <CheckIn />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },

      {
        path: "staffs",
        element: <ManageStaff />,
      },
      {
        path: "create-new-field",
        element: <CreateNewField />,
      },
      {
        path: "update-field",
        element: <UpdateFieldList />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "manage-fields",
        element: <ClubStaffManageFields />,
      },
      {
        path: "account-list",
        element: <AccountList />,
      },
      {
        path: "promotion",
        element: <Promotion />,
      },
      {
        path: "checkin",
        element: <CheckIn />,
      },
      {
        path: "HistoryBooking",
        element: <HistoryBooking />,
      },
    ],
  },
]);

export default router;
