import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CandidateRoutes from "./routes/CandidateRoutes";
import RecruiterRouters from "./routes/RecruiterRouters";
import AdminRoutes from "./routes/AdminRoutes";

import { useSelector } from "react-redux";
import { RootState } from "./redux/reducer";
import { Toaster } from "react-hot-toast";
import { ROLES } from "./utils/constants";
const NotFound = lazy(()=> import("./pages/Error/NotFound"));
const LandingPage = lazy(()=> import("./pages/landing/LandingPage"));

export default function App() {
	
    const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    console.log("loggedinUser", loggedinUser);

    return (
        <>
            <ToastContainer className="mt-10" />
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={
                        loggedinUser?.role === ROLES.CANDIDATE ? (
                            <Navigate to="/candidate" />
                        ) : loggedinUser?.role === ROLES.RECRUITER ? (
                            <Navigate to="/recruiter" />
                        ) : (
                            <LandingPage />
                        )
                    }
                />

                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/candidate/*" element={<CandidateRoutes />} />
                <Route path="/recruiter/*" element={<RecruiterRouters />} />
                <Route path="*" element={<NotFound url="/" />} />
            </Routes>
        </>
    );
}
