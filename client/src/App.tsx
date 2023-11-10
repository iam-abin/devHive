import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CandidateRoutes from "./routes/CandidateRoutes";
import RecruiterRouters from "./routes/RecruiterRouters";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
	return (
			<Routes>
        <Route path="/"  element={<LandingPage />} />
        <Route path="/admin/*"  element={<AdminRoutes />} />
        <Route path="/candidate/*" element={<CandidateRoutes />} />
        <Route path="/recruiter/*" element={<RecruiterRouters />} />
      </Routes>
	);
}
