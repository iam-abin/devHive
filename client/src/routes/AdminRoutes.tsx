import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer";
import BarLoading from "../components/loading/BarLoading";

import AdminLayout from "../pages/layout/AdminLayout";

const AdminSigninPage = lazy(
    () => import("../pages/auth/authUser/AdminSigninPage")
);
const UsersManagementPage = lazy(() => import("../pages/admin/UsersListPage"));
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
import { IUserData } from "../types/user";

function AdminRoutes() {
    const loggedinUser: IUserData | null = useSelector(
        (store: RootState) => store.userReducer.authData
    );
    const { isAdmin } = checkUserRole(loggedinUser);

    const ProtectedRoute = ({ children }: { children: JSX.Element }) =>
        isAdmin ? children : <Navigate to="/admin/signin" />;
    return (
        <>
            <Suspense fallback={<BarLoading />}>
                <Routes>
                    {/* Public Admin Sign-in Route */}
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
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AdminDashBoard />} />
                        <Route
                            path="candidates"
                            element={<UsersManagementPage />}
                        />
                        <Route
                            path="candidate/viewProfileDetails/:userId"
                            element={<ViewProfilePage />}
                        />
                        <Route
                            path="recruiters"
                            element={<UsersManagementPage />}
                        />
                        <Route
                            path="recruiter/viewProfileDetails/:userId"
                            element={<ViewProfilePage />}
                        />
                        <Route path="jobs" element={<JobsManagementPage />} />
                        <Route
                            path="job/viewJobDetails/:jobId"
                            element={<ViewJobDetailsPage />}
                        />
                        <Route
                            path="memberships"
                            element={<PremiumMembershipPage />}
                        />
                        <Route path="payments" element={<PaymentsListPage />} />
                    </Route>

                    {/* Catch-all Not Found Route */}
                    <Route path="*" element={<NotFound url="/admin" />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default AdminRoutes;
