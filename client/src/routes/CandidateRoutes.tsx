import { Route, Routes } from "react-router-dom";

import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateSigninPage from "../pages/candidate/CandidateSigninPage";
import CandidateSignupPage from "../pages/candidate/CandidateSignupPage";
import EmailVerificationPage from "../pages/candidate/EmailVerificationPage";

function CandidateRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<CandidateHomePage />} />
				<Route path="/signin" element={<CandidateSigninPage />} />
				<Route path="/signup" element={<CandidateSignupPage />} />
				<Route path="/:id/verifyEmail/:token" element={<EmailVerificationPage/>}/>
			</Routes>
		</>
	);
}

export default CandidateRoutes;
