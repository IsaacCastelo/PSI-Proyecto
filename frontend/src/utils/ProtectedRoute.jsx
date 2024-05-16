import { useAuth } from '../hooks/AuthContext';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
}
