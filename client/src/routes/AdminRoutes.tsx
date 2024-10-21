import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer";
import Loading from "../components/loading/Loading";

import AdminLayout from "../pages/layout/AdminLayout";



const AdminSigninPage = lazy(
	() => import("../pages/auth/signin/AdminSigninPage")
);
const CandidateManagementPage = lazy(
	() => import("../pages/admin/CandidatesListPage")
);
const RecruiterManagementPage = lazy(
	() => import("../pages/admin/RecruitersListPage")
);
const JobsManagementPage = lazy(
	() => import("../pages/job/admin/JobsListPage")
);
const ViewCandidateProfilePage = lazy(
	() => import("../pages/profile/admin/ViewCandidateProfilePage")
);
const ViewRecruiterProfilePage = lazy(
	() => import("../pages/profile/admin/ViewRecruiterProfilePage")
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

const AdminDashBoard = lazy(
	() => import("../pages/dashboard/AdminDashBoard")
);

const NotFound = lazy(
	() => import("../pages/Error/NotFound")
);

import { ROLES } from "../utils/constants";

function AdminRoutes() {
	const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route
						path="/signin"
						element={
							loggedinUser?.role === ROLES.ADMIN ? (
								<Navigate to="/admin" />
							) : (
								<AdminSigninPage />
							)
						}
					/>
					<Route
						path="/"
						element={
							loggedinUser ? (
								<AdminLayout />
							) : (
								<Navigate to="/admin/signin" />
							)
						}
					>
						<Route
							path="/"
							element={
								loggedinUser ? (
									<AdminDashBoard />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>
						<Route
							path="/candidates"
							element={
								loggedinUser ? (
									<CandidateManagementPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/candidate/viewProfileDetails/:userId"
							element={
								loggedinUser ? (
									<ViewCandidateProfilePage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/recruiter/viewProfileDetails/:userId"
							element={
								loggedinUser ? (
									<ViewRecruiterProfilePage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/recruiters"
							element={
								loggedinUser ? (
									<RecruiterManagementPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/jobs"
							element={
								loggedinUser ? (
									<JobsManagementPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/job/viewJobDetails/:jobId"
							element={
								loggedinUser ? (
									<ViewJobDetailsPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/memberships"
							element={
								loggedinUser ? (
									<PremiumMembershipPage />
								) : (
									<Navigate to="/admin" />
								)
							}
						/>

						<Route
							path="/payments"
							element={
								loggedinUser ? (
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
