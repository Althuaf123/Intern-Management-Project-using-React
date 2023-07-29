import React from "react";
import { Route, Routes } from 'react-router-dom';
import PublicRoute from "../utils/PublicRoutes";
import ProtectedRoute from '../utils/ProtectedRoute'


import LandingPage from "../Pages/LandingPage";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";

import HomePage from "../Pages/HomePage";
import BatchViewPage from "../Pages/BatchViewPage";
import Mentors from "../Pages/Mentors"
import CommunicationCoordinators from "../Pages/CommunicationCoordinators"
import SeniorCoordinators from "../Pages/SeniorCoordinators"
import InternAdd from "../Pages/InternAdd";
import Setpassword from "../Components/Password/SetPassword";

const MainRoutes = () => {
    return (
        <div>
           
            <Routes>
            <Route path = "/homepage" element={<LandingPage />}/>
            <Route path = "/set-password/:uid/:token" element={<Setpassword />} />
            
            
            <Route element={<PublicRoute/>}>
                <Route path = "/signup" element={<Signup />}/>
                <Route path = "/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route exact path="/" element={<HomePage />}/>
                <Route path="/batch-list" element={<BatchViewPage/>} />
                <Route path="/add-intern" element={<InternAdd/>} />
                <Route path="/mentors-list" element={<Mentors />} />
                <Route path="/cc-list" element={<CommunicationCoordinators />} />
                <Route path="/sc-list" element={<SeniorCoordinators />} />

            </Route>
            </Routes>
        
        </div>
    )
}

export default MainRoutes;