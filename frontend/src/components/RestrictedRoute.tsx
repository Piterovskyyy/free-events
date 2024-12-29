import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const RestrictedRoute: React.FC<{children: ReactNode}> = ({ children }) => {
  const context = useContext(UserContext);

  if (!context || !context.user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default RestrictedRoute;
