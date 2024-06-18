import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Conten from "./components/main/Main.jsx";
import Footer from "./components/footer/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import UserProfile from './components/UserProfile/UserProfile.jsx';
import UserFile from './components/UserFile/userFile.jsx';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
// element: <div>
// <Navbar/>
// <Home />
// <Conten/>
// <Footer/>
// </div>
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <div>
        <Home />
        <Conten/>
        </div>
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/userFile',
        element: <UserFile />,
      },
      {
        path: '/UserProfile',
        element: <UserProfile />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
