import { Route, Routes } from "react-router-dom"

import RecruiterHomePage from "../pages/recruiter/RecruiterHomePage"
import RecruiterSigninPage from "../pages/recruiter/RecruiterSigninPage"
import RecruiterSignupPage from "../pages/recruiter/RecruiterSignupPage"
import EmailVerifyRecruiter from "../components/recruiter/EmailVerifyRecruiter"

function RecruiterRouters() {
  return (
    <>
    	<Routes>
			<Route path="/" element={<RecruiterHomePage />} />
			<Route path="/signin" element={<RecruiterSigninPage />} />
			<Route path="/signup" element={<RecruiterSignupPage />} />
			<Route path="/:id/verifyEmail/:token" element={<EmailVerifyRecruiter/>}/>
		</Routes>
    </>
  )
}

export default RecruiterRouters
