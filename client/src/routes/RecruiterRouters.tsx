import { Navigate, Route, Routes } from "react-router-dom"

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux"

import { RootState } from "../redux/reducer"
import Loading from "../components/loading/Loading";

import RecruiterLayout from "../pages/layout/RecruiterLayout";

const RecruiterDashBoard = lazy(()=> import("../pages/dashboard/RecruiterDashBoardPage"))
const CandidateProfilePage = lazy(()=> import("../pages/profile/candidate/CandidateProfilePage"))
const RecruiterSignupPage = lazy(()=> import("../pages/auth/signup/RecruiterSignupPage"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const RecruiterSigninPage = lazy(()=> import("../pages/auth/signin/RecruiterSigninPage"))
const CreateJobPage = lazy(()=> import("../pages/job/recruiter/CreateJobPage"))
const EditJobPage = lazy(()=> import("../pages/job/recruiter/EditJobPage"))
const OtpFormPage = lazy(()=> import("../pages/auth/otp/OtpFormPage"))
const RecruiterProfilePage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfilePage"))
const UpdatePassword = lazy(()=> import("../pages/auth/password/UpdatePassword"))
const RecruiterProfileEditPage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfileEditPage"))
const EmailOrMobileEnterPage = lazy(()=> import("../pages/auth/emailOrMobileEnter/EnterEmailOrMobilePage"))
const JobDetailsPage = lazy(()=> import("../pages/job/recruiter/JobDetailsPage"))
const AllAddedJobs = lazy(()=> import("../pages/job/recruiter/AllAddedJobs"))
const JobApplicationsPage = lazy(()=> import("../pages/job/recruiter/JobApplicationsPage"))
const JobApplicationDetailsPage = lazy(()=> import("../pages/job/recruiter/JobApplicationDetailsPage"))
const ChatPageRecruiter = lazy(()=> import("../pages/chat/ChatPageRecruiter"))
const ViewAllCandidatesPage = lazy(()=> import("../pages/recruiter/ViewAllCandidatesPage"))
const NotFound = lazy(()=> import("../pages/Error/NotFound"))


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
				
				<Route path="/otpSignupRecruiter/:email" element={!loggedinUser? <OtpFormPage /> :<Navigate to={"/recruiter"} />} />
				<Route path="/forgotPasswordEmail" element={!loggedinUser? <EmailOrMobileEnterPage />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/forgotPasswordOtp/:email" element={!loggedinUser? <OtpFormPage />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/forgotPassword/:userId" element={!loggedinUser? <UpdatePassword />: <Navigate to={"/recruiter/landing"} />} />
				
				<Route path="/" element={loggedinUser? <RecruiterLayout />: <Navigate to={"/recruiter/landing"} />} >
				<Route index={true} element={loggedinUser? <RecruiterDashBoard />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/profile" element={ <RecruiterProfilePage />} />
					<Route path="/edit-profile" element={ <RecruiterProfileEditPage />} />

					<Route path="/passwordResetMobile" element={ <EmailOrMobileEnterPage />} />
					<Route path="/passwordResetOtp" element={ <OtpFormPage />} />
					<Route path="/passwordReset" element={ <UpdatePassword />} />


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
