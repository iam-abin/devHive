import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer/reducer";

// import AdminHomePage from "../pages/home/AdminHomePage";
// import AdminSigninPage from "../pages/auth-pages/signin/AdminSigninPage";
// import CandidateManagementPage from "../pages/admin/candidteManagement/CandidatesListPage";
// import RecruiterManagementPage from "../pages/admin/recruiterManagement/RecruitersListPage";
// import JobsManagementPage from "../pages/job-pages/admin/JobsListPage";
// import ViewCandidateProfilePage from "../pages/profile/admin/ViewCandidateProfilePage";
// import ViewRecruiterProfilePage from "../pages/profile/admin/ViewRecruiterProfilePage";
// import ViewJobDetailsPage from "../pages/job-pages/admin/ViewJobDetailsPage";

import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";

const AdminHomePage = lazy(() => import("../pages/home/AdminHomePage"));
const AdminSigninPage = lazy(
	() => import("../pages/auth-pages/signin/AdminSigninPage")
);
const CandidateManagementPage = lazy(
	() => import("../pages/admin/candidteManagement/CandidatesListPage")
);
const RecruiterManagementPage = lazy(
	() => import("../pages/admin/recruiterManagement/RecruitersListPage")
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

function AdminRoutes() {
	const isAdminLoggedIn = useSelector(
		(state: RootState) => state.adminData.data
	);
	return (
		<>
			<Suspense fallback={<Loading />}>
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
				</Routes>
			</Suspense>
		</>
	);
}

export default AdminRoutes;
