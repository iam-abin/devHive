import { Navigate, Route, Routes } from "react-router-dom"

import RecruiterHomePage from "../pages/recruiter/RecruiterHomePage"
import RecruiterSigninPage from "../pages/recruiter/RecruiterSigninPage"
import RecruiterSignupPage from "../pages/recruiter/RecruiterSignupPage"
import { useSelector } from "react-redux"
import { RootState } from "../redux/reducer/reducer"
import LandingPage from "../pages/landing/LandingPage"
import AllJob from "../components/recruiter/AllJob"
import CreateJobPage from "../pages/recruiter/CreateJobPage"
import JobDetails from "../components/recruiter/JobDetails"
import EditJobPage from "../pages/recruiter/EditJobPage"
import OtpFormPageSignup from "../pages/recruiter/OtpFormPageSignup"
import RecruiterProfilePage from "../pages/recruiter/RecruiterProfilePage"

function RecruiterRouters() {
	const isRecruiterLoggedIn = useSelector(
		(state: RootState) => state.recruiterAuth.recruiterLoggedIn
	);
  return (
    <>
    	<Routes>
			<Route path="/" element={isRecruiterLoggedIn? <RecruiterHomePage />: <Navigate to={"/recruiter/landing"} />} />

			<Route path="/" element={isRecruiterLoggedIn? <RecruiterHomePage />: <Navigate to={"/recruiter/landing"} />} />
				<Route path="/profile" element={isRecruiterLoggedIn? <RecruiterProfilePage />: <Navigate to={"/candidate/landing"} />} />

			<Route path="/landing" element={isRecruiterLoggedIn?<Navigate to={"/recruiter"} />: <LandingPage /> } />
			<Route path="/signin" element={isRecruiterLoggedIn?<Navigate to={"/recruiter"} />:<RecruiterSigninPage /> } />
			<Route path="/signup" element={isRecruiterLoggedIn? <Navigate to={"/recruiter"} />:<RecruiterSignupPage />} />
			<Route path="/otpSignupRecruiter/:email" element={!isRecruiterLoggedIn? <OtpFormPageSignup /> :<Navigate to={"/recruiter"} />} />
			<Route path="/all-jobs" element={isRecruiterLoggedIn?<AllJob />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/create-job" element={isRecruiterLoggedIn?<CreateJobPage />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/job-details" element={isRecruiterLoggedIn?<JobDetails />:<Navigate to={"/recruiter/signin"} />} />
			<Route path="/edit-job-details" element={isRecruiterLoggedIn?<EditJobPage />:<Navigate to={"/recruiter/signin"} />} />
			{/* <Route path="/:id/verifyEmail/:token" element={<EmailVerifyRecruiter/>}/> */}
		</Routes>
    </>
  )
}

export default RecruiterRouters
