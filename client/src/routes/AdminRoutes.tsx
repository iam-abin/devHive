import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer";
import Loading from "../components/loading/Loading";

import AdminLayout from "../pages/layout/AdminLayout";

const AdminSigninPage = lazy(
    () => import("../pages/auth/authUser/AdminSigninPage")
);
const UsersManagementPage = lazy(
    () => import("../pages/admin/UsersListPage")
);
const JobsManagementPage = lazy(
    () => import("../pages/job/admin/JobsListPage")
);
const ViewProfilePage = lazy(
    () => import("../pages/profile/admin/ViewProfile")
);
const ViewJobDetailsPage = lazy(
    () => import("../pages/job/admin/ViewJobDetailsPage")
);

const PremiumMembershipPage = lazy(
    () => import("../pages/payment/PremiumMembershipPage")
);

const PaymentsListPage = lazy(
    () => import("../pages/payment/PaymentsListPage")
);

const AdminDashBoard = lazy(() => import("../pages/dashboard/AdminDashBoard"));

const NotFound = lazy(() => import("../pages/Error/NotFound"));

import { checkUserRole } from "../utils/checkRole";

function AdminRoutes() {
    const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );
    const {isAdmin} = checkUserRole(loggedinUser)
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route
                        path="/signin"
                        element={
                            isAdmin ? (
                                <Navigate to="/admin" />
                            ) : (
                                <AdminSigninPage />
                            )
                        }
                    />

                    {/* Protected Admin Routes */}
                    <Route
                        path="/"
                        element={
                            isAdmin ? (
                                <AdminLayout />
                            ) : (
                                <Navigate to="/admin/signin" />
                            )
                        }
                    >
                        <Route
                            path="/"
                            element={
                                isAdmin ? (
                                    <AdminDashBoard />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />
                        <Route
                            path="/candidates"
                            element={
                                isAdmin ? (
                                    <UsersManagementPage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/candidate/viewProfileDetails/:userId"
                            element={
                                isAdmin ? (
                                    <ViewProfilePage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/recruiter/viewProfileDetails/:userId"
                            element={
                                isAdmin ? (
                                    <ViewProfilePage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/recruiters"
                            element={
                                isAdmin ? (
                                    <UsersManagementPage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/jobs"
                            element={
                                isAdmin ? (
                                    <JobsManagementPage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/job/viewJobDetails/:jobId"
                            element={
                                isAdmin ? (
                                    <ViewJobDetailsPage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/memberships"
                            element={
                                isAdmin ? (
                                    <PremiumMembershipPage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />

                        <Route
                            path="/payments"
                            element={
                                isAdmin ? (
                                    <PaymentsListPage />
                                ) : (
                                    <Navigate to="/admin" />
                                )
                            }
                        />
                    </Route>

                    <Route path="*" element={<NotFound url={"/admin"} />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default AdminRoutes;
