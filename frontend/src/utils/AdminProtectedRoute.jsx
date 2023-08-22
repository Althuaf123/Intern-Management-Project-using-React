// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'

// function ProtectedRoute() {
//   const authState = useSelector(state => state.login)
//   return (
//     authState.isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
//   )
// }

// export default ProtectedRoute

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
    return <Navigate to="/login" />;
  } else if (!isAdmin) {
    return <Navigate to="/not-authorized" />;
  } else {
    return <Outlet />;
  }
}

export default AdminProtectedRoute;

