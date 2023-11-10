import { Route, Routes } from "react-router-dom";

import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateSigninPage from "../pages/candidate/CandidateSigninPage";
import CandidateSignupPage from "../pages/candidate/CandidateSignupPage";

function CandidateRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<CandidateHomePage />} />
				<Route path="/signin" element={<CandidateSigninPage />} />
				<Route path="/signup" element={<CandidateSignupPage />} />
			</Routes>
		</>
	);
}

export default CandidateRoutes;
