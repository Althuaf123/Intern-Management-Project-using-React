import React from "react";
import { Route, Routes } from 'react-router-dom';
import PublicRoute from "../utils/PublicRoutes";
import ProtectedRoute from '../utils/ProtectedRoute'


import LandingPage from "../Pages/LandingPage";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";

import HomePage from "../Pages/HomePage";

const MainRoutes = () => {
    return (
        <div>
           
            <Routes>
            <Route path = "/homepage" element={<LandingPage />}/>
            
            
            <Route element={<PublicRoute/>}>
                <Route path = "/signup" element={<Signup />}/>
                <Route path = "/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route exact path="/" element={<HomePage />}/>
            </Route>
            </Routes>
        
        </div>
    )
}

export default MainRoutes;