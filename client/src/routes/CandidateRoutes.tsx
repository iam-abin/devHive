import { Navigate, Route, Routes } from "react-router-dom";

// import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateSigninPage from "../pages/candidate/CandidateSigninPage";
import CandidateSignupPage from "../pages/candidate/CandidateSignupPage";
import EmailVerificationPage from "../pages/candidate/EmailVerificationPage";
import { RootState } from "../redux/reducer/reducer";
import { useSelector } from "react-redux";
import LandingPage from "../pages/landing/LandingPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import AllJobsPage from "../pages/candidate/AllJobsPage";
import JobDetailsPage from "../pages/candidate/JobDetailsPage";

function CandidateRoutes() {
	const isCandidateLoggedIn = useSelector(
		(state: RootState) => state.candidateAuth.candidateLoggedIn
	);
	return (
		<>
			<Routes>
				{/* <Route path="/" element={isCandidateLoggedIn? <CandidateHomePage />: <Navigate to={"/candidate/landing"} />} /> */}
				<Route path="/" element={isCandidateLoggedIn? <CandidateProfilePage />: <Navigate to={"/candidate/landing"} />} />

				<Route path="/landing" element={isCandidateLoggedIn?<Navigate to={"/candidate"} />: <LandingPage /> } />
				<Route path="/signin" element={isCandidateLoggedIn?<Navigate to={"/candidate"} />:<CandidateSigninPage /> } />
				<Route path="/signup" element={isCandidateLoggedIn? <Navigate to={"/candidate"} />:<CandidateSignupPage />} />
				<Route path="/all-jobs" element={isCandidateLoggedIn?<AllJobsPage />:<Navigate to={"/candidate/signin"} />} />
			<Route path="/job-details" element={isCandidateLoggedIn?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} />
				<Route path="/:id/verifyEmail/:token" element={<EmailVerificationPage/>}/>
			</Routes>
		</>
	);
}

export default CandidateRoutes;
