import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useSelector((state) => state.auth.user); // Adjust according to your state structure

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <div>You do not have access to this page</div>;
  }

  return children;
};

// Define PropTypes for the component
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
