import React from "react";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from "../Pages/LandingPage";


const MainRoutes = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}/>
                    <Route path = "/signup" />
                </Routes>
            </Router>
        </div>
    )
}

export default MainRoutes;