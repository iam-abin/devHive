import { Navigate, Route, Routes } from "react-router-dom"

import RecruiterHomePage from "../pages/recruiter/RecruiterHomePage"
import RecruiterSigninPage from "../pages/recruiter/RecruiterSigninPage"
import RecruiterSignupPage from "../pages/recruiter/RecruiterSignupPage"
import EmailVerifyRecruiter from "../components/recruiter/EmailVerifyRecruiter"
import { useSelector } from "react-redux"
import { RootState } from "../redux/reducer/reducer"
import LandingPage from "../pages/landing/LandingPage"

function RecruiterRouters() {
	const isRecruiterLoggedIn = useSelector(
		(state: RootState) => state.recruiterAuth.recruiterLoggedIn
	);
  return (
    <>
    	<Routes>
			<Route path="/" element={isRecruiterLoggedIn? <RecruiterHomePage />: <Navigate to={"/recruiter/landing"} />} />
			<Route path="/landing" element={isRecruiterLoggedIn?<Navigate to={"/recruiter"} />: <LandingPage /> } />
			<Route path="/signin" element={isRecruiterLoggedIn?<Navigate to={"/recruiter"} />:<RecruiterSigninPage /> } />
			<Route path="/signup" element={isRecruiterLoggedIn? <Navigate to={"/recruiter"} />:<RecruiterSignupPage />} />
			<Route path="/:id/verifyEmail/:token" element={<EmailVerifyRecruiter/>}/>
		</Routes>
    </>
  )
}

export default RecruiterRouters
