import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="main-layout">
      {!hideNavbarAndFooter && <Navbar />}
      <div className="main-content">
        <Outlet />
      </div>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
