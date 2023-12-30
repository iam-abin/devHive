import { Navigate, Route, Routes } from "react-router-dom";

// import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateSigninPage from "../pages/auth-pages/signin/CandidateSigninPage";
import CandidateSignupPage from "../pages/auth-pages/signup/CandidateSignupPage";
import { RootState } from "../redux/reducer/reducer";
import { useSelector } from "react-redux";
import LandingPage from "../pages/landing/LandingPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import AllJobsPage from "../pages/candidate/AllJobsPage";
import JobDetailsPage from "../pages/candidate/JobDetailsPage";
import OtpFormPageSignup from "../pages/auth-pages/otp/candidate/OtpFormPageSignup";
import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import ResetPassword from "../pages/auth-pages/password/candidate/ResetPassword";
import OtpFormResetPassword from "../pages/auth-pages/otp/candidate/OtpFormResetPassword";

import ForgotPasswordEmailEnterPage from "../pages/auth-pages/emailOrMobileEnter/candidate/ForgotPasswordEmailEnterPage"
import ForgotPassword from "../pages/auth-pages/password/candidate/ForgotPassword";
import ResetPasswordMobileEnterPage from "../pages/auth-pages/emailOrMobileEnter/candidate/ResetPasswordMobileEnterPage"

import OtpFormPageForgotPassword from "../pages/auth-pages/otp/candidate/OtpFormPageForgotPassword";
import CandidateProfileEditPage from "../pages/candidate/CandidateProfileEditPage";

function CandidateRoutes() {
	const isCandidateLoggedIn = useSelector(
		(state: RootState) => state.candidateData.data
	);
	return (
		<>
			<Routes>
				{/* <Route path="/" element={isCandidateLoggedIn? <CandidateHomePage />: <Navigate to={"/candidate/landing"} />} /> */}
				<Route path="/" element={isCandidateLoggedIn? <CandidateHomePage />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/profile" element={isCandidateLoggedIn? <CandidateProfilePage />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/edit-profile/" element={isCandidateLoggedIn? <CandidateProfileEditPage />: <Navigate to={"/candidate/landing"} />} />

				<Route path="/passwordResetMobile" element={isCandidateLoggedIn? <ResetPasswordMobileEnterPage />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/passwordResetOtp" element={isCandidateLoggedIn? <OtpFormResetPassword />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/passwordReset" element={isCandidateLoggedIn? <ResetPassword />: <Navigate to={"/candidate/landing"} />} />

				<Route path="/forgotPasswordEmail" element={!isCandidateLoggedIn? <ForgotPasswordEmailEnterPage />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/forgotPasswordOtp/:email" element={!isCandidateLoggedIn? <OtpFormPageForgotPassword />: <Navigate to={"/candidate/landing"} />} />
				<Route path="/forgotPassword/:userId" element={!isCandidateLoggedIn? <ForgotPassword />: <Navigate to={"/candidate/landing"} />} />
				
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
