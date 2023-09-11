import React from "react";
import { Route, Routes } from 'react-router-dom';
import PublicRoute from "../utils/PublicRoutes";
import ProtectedRoute from '../utils/ProtectedRoute'
import AdminProtectedRoute from "../utils/AdminProtectedRoute";


import LandingPage from "../Pages/LandingPage";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";
import Unauthorized from "../Components/Extras/Unauthorized";

import HomePage from "../Pages/HomePage";
import BatchViewPage from "../Pages/BatchViewPage";
import Mentors from "../Pages/Mentors"
import CommunicationCoordinators from "../Pages/CommunicationCoordinators"
import SeniorCoordinators from "../Pages/SeniorCoordinators"
import InternAdd from "../Pages/InternAdd";
import Setpassword from "../Components/Password/SetPassword";
import ProfilePage from "../Pages/ProfilePage";
import InternDetails from "../Pages/InternDetails";

import InternHomePage from "../Pages/InternHomePage";
import ChatPage from "../Pages/ChatPage";

const MainRoutes = () => {
    return (
        <div>
           
        <Routes>
            
            <Route path = "/set-password/:uid/:token" element={<Setpassword />} />
            <Route path = "/not-authorized" element={<Unauthorized />} />
            
            
            <Route element={<PublicRoute/>}>
                <Route path = "/homepage" element={<LandingPage />}/>
                <Route path = "/signup" element={<Signup />}/>
                <Route path = "/login" element={<Login />} />
                
               
            </Route>

            <Route element={<ProtectedRoute />}>
               
                <Route path='/intern-home' element={<InternHomePage />} />
                <Route path="/profile-page" element={ <ProfilePage />} />
                <Route path="/chat" element={ <ChatPage />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>

                 <Route exact path="/" element={<HomePage />}/>
                <Route path="/batch-list" element={<BatchViewPage/>} />
                <Route path="/add-intern" element={<InternAdd/>} />
                <Route path="/mentors-list" element={<Mentors />} />
                <Route path="/cc-list" element={<CommunicationCoordinators />} />
                <Route path="/sc-list" element={<SeniorCoordinators />} />
                
                <Route path="/intern-details" element={ <InternDetails /> } />

            </Route>

            </Routes>
        
        </div>
    )
}

export default MainRoutes;