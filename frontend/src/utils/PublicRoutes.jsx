import React from "react";
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'

function PublicRoutes() { 
    const authState = useSelector(state => state.login)
    return (
        !authState.isAuthenticated ? <Outlet/> : <Navigate to='/' />
    )
}

export default PublicRoutes