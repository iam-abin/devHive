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
import { SocketProvider } from "./context/socketContext";
import { checkUserRole } from "./utils/checkRole";
const NotFound = lazy(() => import("./pages/Error/NotFound"));
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));

export default function App() {
    const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const { isCandidate, isRecruiter } = checkUserRole(loggedinUser);

    console.log("loggedinUser", loggedinUser);

    return (
        <>
            <ToastContainer className="mt-10" />
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={
                        isCandidate ? (
                            <Navigate to="/candidate" />
                        ) : isRecruiter ? (
                            <Navigate to="/recruiter" />
                        ) : (
                            <LandingPage />
                        )
                    }
                />

                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route
                    path="/candidate/*"
                    element={
                        isCandidate ? (
                            <SocketProvider currentUserId ={loggedinUser.id}>
                                <CandidateRoutes />
                            </SocketProvider>
                        ) : (
                            <CandidateRoutes />
                        )
                    }
                />
                <Route
                    path="/recruiter/*"
                    element={
                        isRecruiter ? (
                            <SocketProvider currentUserId ={loggedinUser.id}>
                                <RecruiterRouters />
                            </SocketProvider>
                        ) : (
                            <RecruiterRouters />
                        )
                    }
                />
                <Route path="*" element={<NotFound url="/" />} />
            </Routes>
        </>
    );
}
