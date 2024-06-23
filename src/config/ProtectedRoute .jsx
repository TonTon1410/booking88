import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// Example definition of getUserRole function
const getUserRole = () => {
  // Implement the logic to get the user role, e.g., from a context, a store, or directly from localStorage
  return 'admin'; // Placeholder value for user role
};

const ProtectedRoute = ({ children, requiredRole, ...rest }) => {
  const userRole = getUserRole(); // Get the user's role

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userRole === requiredRole ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
