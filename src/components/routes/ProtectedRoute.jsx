import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../utils/routes';

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.persist.authReducer.auth);
  const location = useLocation();

  /**
   * check if user is not authenticate
   * redirect to login route
   */
  if (!auth) {
    return <Navigate to={routes.login} replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
