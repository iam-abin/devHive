import { Route, Routes } from "react-router-dom"

import RecruiterHomePage from "../pages/recruiter/RecruiterHomePage"
import RecruiterSigninPage from "../pages/recruiter/RecruiterSigninPage"
import RecruiterSignupPage from "../pages/recruiter/RecruiterSignupPage"

function RecruiterRouters() {
  return (
    <>
    	<Routes>
				<Route path="/" element={<RecruiterHomePage />} />
				<Route path="/signin" element={<RecruiterSigninPage />} />
				<Route path="/signup" element={<RecruiterSignupPage />} />
			</Routes>
    </>
  )
}

export default RecruiterRouters
