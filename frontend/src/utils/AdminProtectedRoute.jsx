import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function isAdminUser() {
  const role = localStorage.getItem('role');
  return role === 'true';
}

function AdminProtectedRoute() {
  const isAdmin = isAdminUser();
  const authState = useSelector(state => state.login);

  if (!authState.isAuthenticated) {
    return <Navigate to="/homepage" />;
  } else if (!isAdmin) {
    return <Navigate to="/intern-home" />;
  } else {
    return <Outlet />;
  }
}

export default AdminProtectedRoute;

