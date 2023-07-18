import React from 'react';
import { useAuth } from './auth';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth2 = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to='/login2' state={{ path: location.pathname }} />
  }
  return children
}
