import { Navigate, Route, Routes } from "react-router-dom";

import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminSigninPage from "../pages/admin/AdminSigninPage";
import CandidateManagementPage from "../pages/admin/CandidateManagementPage";
import RecruiterManagementPage from "../pages/admin/RecruiterManagementPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer/reducer";

function AdminRoutes() {
	const isAdminLoggedIn = useSelector(
		(state: RootState) => state.adminAuth.adminLoggedIn
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
					path="/recruiters"
          element={
						isAdminLoggedIn ? (
							<RecruiterManagementPage />
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
