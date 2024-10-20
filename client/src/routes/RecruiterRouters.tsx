import { Navigate, Route, Routes } from "react-router-dom"

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux"

import { RootState } from "../redux/reducer"
import Loading from "../components/loading/Loading";
import NotFound from "../pages/Error/NotFound";

import RecruiterLayout from "../pages/layout/RecruiterLayout";

// import socket from "../config/socket";



// const RecruiterHomePage = lazy(()=> import("../pages/home/RecruiterHomePage"))
const RecruiterDashBoard = lazy(()=> import("../pages/dashboard/RecruiterDashBoardPage"))
const CandidateProfilePage = lazy(()=> import("../pages/profile/candidate/CandidateProfilePage"))
const RecruiterSignupPage = lazy(()=> import("../pages/auth-pages/signup/RecruiterSignupPage"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const RecruiterSigninPage = lazy(()=> import("../pages/auth-pages/signin/RecruiterSigninPage"))
// const AllJobsPage = lazy(()=> import("../pages/job-pages/recruiter/AllJobsPage"))
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
// const CandidateProfileDetailsPage = lazy(()=> import("../pages/profile/recruiter/CandidateProfileDetailsPage"))
const ChatPageRecruiter = lazy(()=> import("../pages/chat/ChatPageRecruiter"))
const ViewAllCandidatesPage = lazy(()=> import("../pages/recruiter/ViewAllCandidatesPage"))

function RecruiterRouters() {
	
	const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

	console.log(loggedinUser);
	

  return (
    <>
		<Suspense fallback={<Loading />}>
				
			<Routes>
				<Route path="/landing" element={loggedinUser?<Navigate to={"/recruiter"} />: <LandingPage /> } />
				<Route path="/signin" element={loggedinUser?<Navigate to={"/recruiter"} />:<RecruiterSigninPage /> } />
				<Route path="/signup" element={loggedinUser? <Navigate to={"/recruiter"} />:<RecruiterSignupPage />} />
				
				<Route path="/otpSignupRecruiter/:email" element={!loggedinUser? <OtpFormPageSignup /> :<Navigate to={"/recruiter"} />} />
				<Route path="/forgotPasswordEmail" element={!loggedinUser? <ForgotPasswordEmailEnterPage />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/forgotPasswordOtp/:email" element={!loggedinUser? <OtpFormPageForgotPassword />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/forgotPassword/:userId" element={!loggedinUser? <ForgotPassword />: <Navigate to={"/recruiter/landing"} />} />
				
				<Route path="/" element={loggedinUser? <RecruiterLayout />: <Navigate to={"/recruiter/landing"} />} >
				<Route index={true} element={loggedinUser? <RecruiterDashBoard />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/profile" element={ <RecruiterProfilePage />} />
					<Route path="/edit-profile" element={ <RecruiterProfileEditPage />} />

					<Route path="/passwordResetMobile" element={ <ResetPasswordMobileEnterPage />} />
					<Route path="/passwordResetOtp" element={ <OtpFormResetPassword />} />
					<Route path="/passwordReset" element={ <ResetPassword />} />


					<Route path="/all-candidates" element={<ViewAllCandidatesPage />} />
				
					<Route path="/recruiter-added-jobs" element={<AllAddedJobs />} />
					<Route path="/create-job" element={<CreateJobPage />} />
					<Route path="/job-details/:jobId" element={<JobDetailsPage />} />
					<Route path="/edit-job-details/:jobId" element={<EditJobPage />} />
					<Route path="/applications" element={<JobApplicationsPage />} />
					<Route path="/application-details/:jobApplicationId" element={<JobApplicationDetailsPage />} />
					<Route path="viewCandidateProfileDetails/:candidateId" element={<CandidateProfilePage />} />
					<Route path="/chat/:recepientId" element={<ChatPageRecruiter />} />
					<Route path="/candidate-profile/:candidateId" element={ <CandidateProfilePage />} />
				</Route>

				<Route path="*" element={<NotFound url={"/recruiter"} />} />
			</Routes>
			
		</Suspense>
    </>
  )
}

export default RecruiterRouters
