import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

function PublicRoute({ children }) {
  const auth = useSelector((state) => state.persist.authReducer.auth);

  /**
   * check if user is authenticate
   * redirect to home route
   */
  if (auth) {
    return <Navigate to={routes.home} />;
  }

  return children;
}

export default PublicRoute;
