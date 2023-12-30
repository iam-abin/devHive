import { Navigate, Route, Routes } from "react-router-dom";

import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminSigninPage from "../pages/auth-pages/signin/AdminSigninPage";
import CandidateManagementPage from "../pages/admin/CandidateManagementPage";
import RecruiterManagementPage from "../pages/admin/RecruiterManagementPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer/reducer";
import ViewProfileDetails from "../components/admin/ViewProfileDetails";
import ViewRecruiterProfileDetails from "../components/admin/ViewRecruiterProfileDetails";
import ViewJobDetails from "../components/admin/ViewJobDetails";
import JobsManagement from "../components/admin/JobsManagement";

function AdminRoutes() {
	const isAdminLoggedIn = useSelector(
		(state: RootState) => state.adminData.data
	);
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						isAdminLoggedIn ? (
							<AdminHomePage />
						) : (
							<Navigate to="/admin/signin" />
						)
					}
				/>
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
							<ViewProfileDetails />
						) : (
							<Navigate to="/admin" />
						)
					}
				/>

				<Route
					path="/recruiter/viewProfileDetails/:userId"
					element={
						isAdminLoggedIn ? (
							<ViewRecruiterProfileDetails />
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
							<JobsManagement />
						) : (
							<Navigate to="/admin" />
						)
					}
				/>

				<Route
					path="/job/viewJobDetails/:jobId"
					element={
						isAdminLoggedIn ? (
							<ViewJobDetails />
						) : (
							<Navigate to="/admin" />
						)
					}
				/>
			</Routes>
		</>
	);
}

export default AdminRoutes;
