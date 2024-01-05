import { Navigate, Route, Routes } from "react-router-dom"

import { useSelector } from "react-redux"
import { RootState } from "../redux/reducer/reducer"

// import RecruiterHomePage from "../pages/home/RecruiterHomePage"
// import RecruiterSigninPage from "../pages/auth-pages/signin/RecruiterSigninPage"
// import RecruiterSignupPage from "../pages/auth-pages/signup/RecruiterSignupPage"
// import LandingPage from "../pages/landing/LandingPage"
// import AllJobsPage from "../pages/job-pages/recruiter/AllJobsPage"
// import CreateJobPage from "../pages/job-pages/recruiter/CreateJobPage"
// import EditJobPage from "../pages/job-pages/recruiter/EditJobPage"
// import OtpFormPageSignup from "../pages/auth-pages/otp/recruiter/OtpFormPageSignup"
// import RecruiterProfilePage from "../pages/profile/recruiter/RecruiterProfilePage"
// import OtpFormResetPassword from "../pages/auth-pages/otp/recruiter/OtpFormResetPassword"
// import ResetPassword from "../pages/auth-pages/password/recruiter/ResetPassword"
// import OtpFormPageForgotPassword from "../pages/auth-pages/otp/recruiter/OtpFormPageForgotPassword"
// import ForgotPassword from "../pages/auth-pages/password/recruiter/ForgotPassword"
// import RecruiterProfileEditPage from "../pages/profile/recruiter/RecruiterProfileEditPage"
// import ResetPasswordMobileEnterPage from "../pages/auth-pages/emailOrMobileEnter/recruiter/ResetPasswordMobileEnterPage"
// import ForgotPasswordEmailEnterPage from "../pages/auth-pages/emailOrMobileEnter/recruiter/ForgotPasswordEmailEnterPage"
// import JobDetailsPage from "../pages/job-pages/recruiter/JobDetailsPage"
// import AllAddedJobs from "../pages/job-pages/recruiter/AllAddedJobs"
// import JobApplicationsPage from "../pages/job-pages/recruiter/JobApplicationsPage"
// import JobApplicationDetailsPage from "../pages/job-pages/recruiter/JobApplicationDetailsPage"


import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";

const RecruiterHomePage = lazy(()=> import("../pages/home/RecruiterHomePage"))
const RecruiterSignupPage = lazy(()=> import("../pages/auth-pages/signup/RecruiterSignupPage"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const RecruiterSigninPage = lazy(()=> import("../pages/auth-pages/signin/RecruiterSigninPage"))
const AllJobsPage = lazy(()=> import("../pages/job-pages/recruiter/AllJobsPage"))
const CreateJobPage = lazy(()=> import("../pages/job-pages/recruiter/CreateJobPage"))
const EditJobPage = lazy(()=> import("../pages/job-pages/recruiter/EditJobPage"))
const OtpFormPageSignup = lazy(()=> import("../pages/auth-pages/otp/recruiter/OtpFormPageSignup"))
const RecruiterProfilePage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfilePage"))
const OtpFormResetPassword = lazy(()=> import("../pages/auth-pages/otp/recruiter/OtpFormResetPassword"))
const ResetPassword = lazy(()=> import("../pages/auth-pages/password/recruiter/ResetPassword"))
const OtpFormPageForgotPassword = lazy(()=> import("../pages/auth-pages/otp/recruiter/OtpFormPageForgotPassword"))
const ForgotPassword = lazy(()=> import("../pages/auth-pages/password/recruiter/ForgotPassword"))
const RecruiterProfileEditPage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfileEditPage"))
const ResetPasswordMobileEnterPage = lazy(()=> import("../pages/auth-pages/emailOrMobileEnter/recruiter/ResetPasswordMobileEnterPage"))
const ForgotPasswordEmailEnterPage = lazy(()=> import("../pages/auth-pages/emailOrMobileEnter/recruiter/ForgotPasswordEmailEnterPage"))
const JobDetailsPage = lazy(()=> import("../pages/job-pages/recruiter/JobDetailsPage"))
const AllAddedJobs = lazy(()=> import("../pages/job-pages/recruiter/AllAddedJobs"))
const JobApplicationsPage = lazy(()=> import("../pages/job-pages/recruiter/JobApplicationsPage"))
const JobApplicationDetailsPage = lazy(()=> import("../pages/job-pages/recruiter/JobApplicationDetailsPage"))
const CandidateProfileDetailsPage = lazy(()=> import("../pages/profile/recruiter/CandidateProfileDetailsPage"))


function RecruiterRouters() {
	const isRecruiterLoggedIn = useSelector(
		(state: RootState) => state.recruiterData.data
	);
  return (
    <>
		<Suspense fallback={<Loading />}>
			<Routes>
				
				
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
				<Route path="/all-jobs" element={isRecruiterLoggedIn?<AllJobsPage />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="/recruiter-added-jobs" element={isRecruiterLoggedIn?<AllAddedJobs />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="/create-job" element={isRecruiterLoggedIn?<CreateJobPage />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="/job-details/:jobId" element={isRecruiterLoggedIn?<JobDetailsPage />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="/edit-job-details/:jobId" element={isRecruiterLoggedIn?<EditJobPage />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="/applications" element={isRecruiterLoggedIn?<JobApplicationsPage />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="/application-details/:jobApplicationId" element={isRecruiterLoggedIn?<JobApplicationDetailsPage />:<Navigate to={"/recruiter/signin"} />} />
				<Route path="viewCandidateProfileDetails/:candidateId" element={isRecruiterLoggedIn?<CandidateProfileDetailsPage />:<Navigate to={"/recruiter/signin"} />} />
				{/* <Route path="/:id/verifyEmail/:token" element={<EmailVerifyRecruiter/>}/> */}
			</Routes>
		</Suspense>
    </>
  )
}

export default RecruiterRouters
