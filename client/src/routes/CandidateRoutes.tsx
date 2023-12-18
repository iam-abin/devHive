import { Navigate, Route, Routes } from "react-router-dom";

// import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateSigninPage from "../pages/candidate/CandidateSigninPage";
import CandidateSignupPage from "../pages/candidate/CandidateSignupPage";
import { RootState } from "../redux/reducer/reducer";
import { useSelector } from "react-redux";
import LandingPage from "../pages/landing/LandingPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import AllJobsPage from "../pages/candidate/AllJobsPage";
import JobDetailsPage from "../pages/candidate/JobDetailsPage";
import OtpFormPageSignup from "../pages/candidate/OtpFormPageSignup";
import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import PasswordReset from "../components/candidate/PasswordReset";
import PasswordResetOtpFrom from "../components/candidate/PasswordResetOtpFrom";
import ForgotPasswordFormEmail from "../components/candidate/ForgotPasswordFormEmail";
import ForgotPasswordPassword from "../components/candidate/ForgotPasswordPassword";
import ResetPasswordFormMobile from "../components/candidate/ResetPasswordFormMobile";
import ForgotPasswordOtpFrom from "../components/candidate/ForgotPasswordOtpFrom";
import EditProfile from "../components/candidate/EditProfile";

function CandidateRoutes() {
	const isCandidateLoggedIn = useSelector(
		(state: RootState) => state.candidateAuth.candidateLoggedIn
	);
	return (
		<>
			<Routes>
				{/* <Route path="/" element={isCandidateLoggedIn? <CandidateHomePage />: <Navigate to={"/candidate/landing"} />} /> */}
				<Route path="/" element={isCandidateLoggedIn? <CandidateHomePage />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/profile" element={isCandidateLoggedIn? <CandidateProfilePage />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/edit-profile/:userId" element={isCandidateLoggedIn? <EditProfile />: <Navigate to={"/candidate/landing"} />} />

				<Route path="/passwordResetMobile" element={isCandidateLoggedIn? <ResetPasswordFormMobile />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/passwordResetOtp" element={isCandidateLoggedIn? <PasswordResetOtpFrom />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/passwordReset" element={isCandidateLoggedIn? <PasswordReset />: <Navigate to={"/candidate/landing"} />} />

				<Route path="/forgotPasswordEmail" element={!isCandidateLoggedIn? <ForgotPasswordFormEmail />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/forgotPasswordOtp/:email" element={!isCandidateLoggedIn? <ForgotPasswordOtpFrom />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/forgotPassword/:userId" element={!isCandidateLoggedIn? <ForgotPasswordPassword />: <Navigate to={"/candidate/landing"} />} />
				
				<Route path="/landing" element={isCandidateLoggedIn?<Navigate to={"/candidate"} />: <LandingPage /> } />
				<Route path="/signin" element={isCandidateLoggedIn?<Navigate to={"/candidate"} />:<CandidateSigninPage /> } />
				<Route path="/signup" element={isCandidateLoggedIn? <Navigate to={"/candidate"} />:<CandidateSignupPage />} />
				<Route path="/otpSignupCandidate/:email" element={!isCandidateLoggedIn? <OtpFormPageSignup /> :<Navigate to={"/candidate"} />} />

				<Route path="/all-jobs" element={isCandidateLoggedIn?<AllJobsPage />:<Navigate to={"/candidate/signin"} />} />
				<Route path="/job-details" element={isCandidateLoggedIn?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} />
			</Routes>
		</>
	);
}

export default CandidateRoutes;
