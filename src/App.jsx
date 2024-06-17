import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Conten from "./components/main/Main.jsx";
import Footer from "./components/footer/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx";
// import Profile from "./components/profile/Profile.jsx";
//import UserFile from "./components/UserFile/userFile.jsx"; // Đảm bảo nhập đúng
import UserFile from './components/UserFile/userFile.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PasswordRecovery from './components/reset/PasswordRecovery.jsx';
import Booking11 from './components/booking/Booking11.jsx';
// import booking from './components/Booking/booking.jsx';
// import {
// createBrowserRouter,
// Link,
// RouterProvider
// } from 'react-router-dom';
// import { Profiler } from 'react';

const router = createBrowserRouter([
// {
// path: '/',
// element: (
// <div>
// <h1>Home Page</h1>
// <nav>
// <Link to="/login">To Login</Link> |{" "}
// <Link to="/register">To Register</Link> |{" "}
// <Link to="/dashboard">To Dashboard</Link>
// </nav>
// </div>
// )
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
  path: '/userFile',
  element: <div> <UserFile/> </div>
},
{
  path: '/PasswordRecovery',
  element: <div> <PasswordRecovery /> </div>
},
{
  path: '/booking"',
  element: <div> <Booking11 /> </div>
},

{
  path: '*',
  element: <div>404 Not Found</div>
},
])

const App = () => {
return (
<div>
<RouterProvider router={router} />
</div>
);
}

export default App;