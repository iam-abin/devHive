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

import CandidateLayout from "./pages/layout/CandidateLayout";
const NotFound = lazy(() => import("./pages/Error/NotFound"));

export default function App() {
    const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const { isCandidate, isRecruiter } = checkUserRole(loggedinUser);

    return (
        <>
            <ToastContainer className="mt-10" />
            <Toaster />
            <Routes>
                {/* Root Redirect */}
                <Route
                    path="/"
                    element={
                        isCandidate ? (
                            <Navigate to="/candidate" />
                        ) : isRecruiter ? (
                            <Navigate to="/recruiter" />
                        ) : (
                            <Navigate to="/candidate/landing" />
                        )
                    }
                />

                {/* Route Groups */}
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route
                    path="/candidate/*"
                    element={
                        isCandidate ? (
                            <SocketProvider currentUserId={loggedinUser.id}>
                                <CandidateLayout>
                                    <CandidateRoutes />
                                </CandidateLayout>
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
                            <SocketProvider currentUserId={loggedinUser.id}>
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
