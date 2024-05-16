import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  /**
   * Logs the user in and redirects to the dashboard.
   * @param {object} data - User data.
   */
  const login = async (data) => {
    setUser(data);
    localStorage.setItem('user', data);
    navigate('/dashboard');
  };

  /**
   * Logs the user out and redirects to the login page.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
