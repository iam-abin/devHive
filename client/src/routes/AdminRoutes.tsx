import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer/reducer";
import Loading from "../components/loading/Loading";

import AdminLayout from "../pages/layout/AdminLayout";



const AdminSigninPage = lazy(
	() => import("../pages/auth-pages/signin/AdminSigninPage")
);
const CandidateManagementPage = lazy(
	() => import("../pages/admin/CandidatesListPage")
);
const RecruiterManagementPage = lazy(
	() => import("../pages/admin/RecruitersListPage")
);
const JobsManagementPage = lazy(
	() => import("../pages/job-pages/admin/JobsListPage")
);
const ViewCandidateProfilePage = lazy(
	() => import("../pages/profile/admin/ViewCandidateProfilePage")
);
const ViewRecruiterProfilePage = lazy(
	() => import("../pages/profile/admin/ViewRecruiterProfilePage")
);
const ViewJobDetailsPage = lazy(
	() => import("../pages/job-pages/admin/ViewJobDetailsPage")
);

const PremiumMembershipPage = lazy(
	() => import("../pages/payment/PremiumMembershipPage")
);

const PaymentsListPage = lazy(
	() => import("../pages/payment/PaymentsListPage")
);

const AdminDashBoard = lazy(
	() => import("../pages/dashboard/AdminDashBoard")
);

import NotFound from "../pages/Error/NotFound";
// const NotFound = lazy(
// 	() => import("../pages/auth-pages/signin/AdminSigninPage")
// );

function AdminRoutes() {
	const isAdminLoggedIn = useSelector(
		(state: RootState) => state.adminData.data
	);
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route
						path="/signin"
						element={
							isAdminLoggedIn ? (
								<Navigate to="/admin" />
							) : (
								<AdminSigninPage />
							)
						}
					/>
					<Route
						path="/"
						element={
							isAdminLoggedIn ? (
								<AdminLayout />
							) : (
								<Navigate to="/admin/signin" />
							)
						}
					>
						<Route
							path="/"
							element={
								isAdminLoggedIn ? (
									<AdminDashBoard />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>
						<Route
							path="/candidates"
							element={
								isAdminLoggedIn ? (
									<CandidateManagementPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/candidate/viewProfileDetails/:userId"
							element={
								isAdminLoggedIn ? (
									<ViewCandidateProfilePage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/recruiter/viewProfileDetails/:userId"
							element={
								isAdminLoggedIn ? (
									<ViewRecruiterProfilePage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/recruiters"
							element={
								isAdminLoggedIn ? (
									<RecruiterManagementPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/jobs"
							element={
								isAdminLoggedIn ? (
									<JobsManagementPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/job/viewJobDetails/:jobId"
							element={
								isAdminLoggedIn ? (
									<ViewJobDetailsPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/memberships"
							element={
								isAdminLoggedIn ? (
									<PremiumMembershipPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/payments"
							element={
								isAdminLoggedIn ? (
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
