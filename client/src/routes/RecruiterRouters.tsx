import { Navigate, Route, Routes } from "react-router-dom"

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux"

import { RootState } from "../redux/reducer"
import Loading from "../components/loading/Loading";

import RecruiterLayout from "../pages/layout/RecruiterLayout";
import { checkUserRole } from "../utils/checkRole";

const RecruiterDashBoard = lazy(()=> import("../pages/dashboard/RecruiterDashBoardPage"))
const CandidateProfilePage = lazy(()=> import("../pages/profile/candidate/CandidateProfilePage"))
const AuthRecruiter = lazy(()=> import("../pages/auth/authUser/AuthRecruiter"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const CreateJobPage = lazy(()=> import("../pages/job/recruiter/CreateJobPage"))
const EditJobPage = lazy(()=> import("../pages/job/recruiter/EditJobPage"))
const OtpFormPage = lazy(()=> import("../pages/auth/otp/OtpFormPage"))
const RecruiterProfilePage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfilePage"))
const UpdatePassword = lazy(()=> import("../pages/auth/password/UpdatePassword"))
const RecruiterProfileEditPage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfileEditPage"))
const EmailOrMobileEnterPage = lazy(()=> import("../pages/auth/emailOrMobileEnter/EnterEmailOrMobilePage"))
const JobDetailsPage = lazy(()=> import("../pages/job/JobDetailsPage"))
const AllAddedJobs = lazy(()=> import("../pages/job/recruiter/AllAddedJobs"))
const JobApplicationsPage = lazy(()=> import("../pages/job/recruiter/JobApplicationsPage"))
const JobApplicationDetailsPage = lazy(()=> import("../pages/job/recruiter/JobApplicationDetailsPage"))
const ChatPageRecruiter = lazy(()=> import("../pages/chat/ChatPage"))
const ViewAllCandidatesPage = lazy(()=> import("../pages/recruiter/ViewAllCandidatesPage"))
const NotFound = lazy(()=> import("../pages/Error/NotFound"))


function RecruiterRouters() {
	
	const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

	const { isRecruiter } = checkUserRole(loggedinUser) 

  return (
    <>
		<Suspense fallback={<Loading />}>
				
			<Routes>
				<Route path="/landing" element={isRecruiter?<Navigate to={"/recruiter"} />: <LandingPage /> } />
				<Route path="/signin" element={isRecruiter?<Navigate to={"/recruiter"} />:<AuthRecruiter /> } />
				<Route path="/signup" element={isRecruiter? <Navigate to={"/recruiter"} />:<AuthRecruiter />} />
				
				<Route path="/otpSignupRecruiter/:email" element={!isRecruiter? <OtpFormPage /> :<Navigate to={"/recruiter"} />} />
				<Route path="/forgotPasswordEmail" element={!isRecruiter? <EmailOrMobileEnterPage />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/forgotPasswordOtp/:email" element={!isRecruiter? <OtpFormPage />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/forgotPassword/:userId" element={!isRecruiter? <UpdatePassword />: <Navigate to={"/recruiter/landing"} />} />
				
				<Route path="/" element={isRecruiter? <RecruiterLayout />: <Navigate to={"/recruiter/landing"} />} >
				<Route index={true} element={isRecruiter? <RecruiterDashBoard />: <Navigate to={"/recruiter/landing"} />} />
					<Route path="/profile" element={  isRecruiter? <RecruiterProfilePage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/edit-profile" element={  isRecruiter? <RecruiterProfileEditPage />: <Navigate to={"/candidate/signin"} />} />

					<Route path="/passwordResetMobile" element={  isRecruiter? <EmailOrMobileEnterPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/passwordResetOtp" element={  isRecruiter? <OtpFormPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/passwordReset" element={  isRecruiter? <UpdatePassword />: <Navigate to={"/candidate/signin"} />} />


					<Route path="/all-candidates" element={  isRecruiter?<ViewAllCandidatesPage />: <Navigate to={"/candidate/signin"} />} />
				
					<Route path="/recruiter-added-jobs" element={  isRecruiter?<AllAddedJobs />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/create-job" element={  isRecruiter?<CreateJobPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/job-details/:jobId" element={  isRecruiter?<JobDetailsPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/edit-job-details/:jobId" element={  isRecruiter?<EditJobPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/applications" element={  isRecruiter?<JobApplicationsPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/application-details/:jobApplicationId" element={  isRecruiter?<JobApplicationDetailsPage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="viewCandidateProfileDetails/:candidateId" element={  isRecruiter?<CandidateProfilePage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/chat/:recepientId" element={  isRecruiter?<ChatPageRecruiter />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/candidate-profile/:candidateId" element={  isRecruiter? <CandidateProfilePage />: <Navigate to={"/candidate/signin"} />} />
				</Route>

				<Route path="*" element={<NotFound url={"/recruiter"} />} />
			</Routes>
			
		</Suspense>
    </>
  )
}

export default RecruiterRouters
