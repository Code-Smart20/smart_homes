import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-2xl font-bold">Loading...</h3>
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoute;

