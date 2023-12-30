import { Navigate, Route, Routes } from "react-router-dom"

import RecruiterHomePage from "../pages/recruiter/RecruiterHomePage"
import RecruiterSigninPage from "../pages/auth-pages/signin/RecruiterSigninPage"
import RecruiterSignupPage from "../pages/auth-pages/signup/RecruiterSignupPage"
import { useSelector } from "react-redux"
import { RootState } from "../redux/reducer/reducer"
import LandingPage from "../pages/landing/LandingPage"
import AllJob from "../components/recruiter/AllJob"
import CreateJobPage from "../pages/recruiter/CreateJobPage"
import JobDetails from "../components/recruiter/JobDetails"
import EditJobPage from "../pages/recruiter/EditJobPage"
import OtpFormPageSignup from "../pages/auth-pages/otp/recruiter/OtpFormPageSignup"
import RecruiterProfilePage from "../pages/recruiter/RecruiterProfilePage"
import OtpFormResetPassword from "../pages/auth-pages/otp/recruiter/OtpFormResetPassword"
import ResetPassword from "../pages/auth-pages/password/recruiter/ResetPassword"
import OtpFormPageForgotPassword from "../pages/auth-pages/otp/recruiter/OtpFormPageForgotPassword"
import ForgotPassword from "../pages/auth-pages/password/recruiter/ForgotPassword"
import AllAddedJobs from "../components/recruiter/AllAddedJobs"
import RecruiterProfileEditPage from "../pages/recruiter/RecruiterProfileEditPage"
import ResetPasswordMobileEnterPage from "../pages/auth-pages/emailOrMobileEnter/recruiter/ResetPasswordMobileEnterPage"
import ForgotPasswordEmailEnterPage from "../pages/auth-pages/emailOrMobileEnter/recruiter/ForgotPasswordEmailEnterPage"

function RecruiterRouters() {
	const isRecruiterLoggedIn = useSelector(
		(state: RootState) => state.recruiterData.data
	);
  return (
    <>
    	<Routes>
			<Route path="/" element={isRecruiterLoggedIn? <RecruiterHomePage />: <Navigate to={"/recruiter/landing"} />} />
			
			<Route path="/" element={isRecruiterLoggedIn? <RecruiterHomePage />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/profile" element={isRecruiterLoggedIn? <RecruiterProfilePage />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/edit-profile" element={isRecruiterLoggedIn? <RecruiterProfileEditPage />: <Navigate to={"/recruiter/landing"} />} />

			<Route path="/passwordResetMobile" element={isRecruiterLoggedIn? <ResetPasswordMobileEnterPage />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/passwordResetOtp" element={isRecruiterLoggedIn? <OtpFormResetPassword />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/passwordReset" element={isRecruiterLoggedIn? <ResetPassword />: <Navigate to={"/recruiter/landing"} />} />

			<Route path="/forgotPasswordEmail" element={!isRecruiterLoggedIn? <ForgotPasswordEmailEnterPage />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/forgotPasswordOtp/:email" element={!isRecruiterLoggedIn? <OtpFormPageForgotPassword />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/forgotPassword/:userId" element={!isRecruiterLoggedIn? <ForgotPassword />: <Navigate to={"/recruiter/landing"} />} />

			<Route path="/landing" element={isRecruiterLoggedIn?<Navigate to={"/recruiter"} />: <LandingPage /> } />
			<Route path="/signin" element={isRecruiterLoggedIn?<Navigate to={"/recruiter"} />:<RecruiterSigninPage /> } />
			<Route path="/signup" element={isRecruiterLoggedIn? <Navigate to={"/recruiter"} />:<RecruiterSignupPage />} />
			<Route path="/otpSignupRecruiter/:email" element={!isRecruiterLoggedIn? <OtpFormPageSignup /> :<Navigate to={"/recruiter"} />} />
			<Route path="/all-jobs" element={isRecruiterLoggedIn?<AllJob />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/recruiter-added-jobs" element={isRecruiterLoggedIn?<AllAddedJobs />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/create-job" element={isRecruiterLoggedIn?<CreateJobPage />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/job-details" element={isRecruiterLoggedIn?<JobDetails />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/edit-job-details" element={isRecruiterLoggedIn?<EditJobPage />:<Navigate to={"/recruiter/signin"} />} />
			{/* <Route path="/:id/verifyEmail/:token" element={<EmailVerifyRecruiter/>}/> */}
		</Routes>
    </>
  )
}

export default RecruiterRouters
