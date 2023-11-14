import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CandidateRoutes from "./routes/CandidateRoutes";
import RecruiterRouters from "./routes/RecruiterRouters";
import AdminRoutes from "./routes/AdminRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
	return (
		<>
			<ToastContainer className="mt-10" />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route path="/candidate/*" element={<CandidateRoutes />} />
				<Route path="/recruiter/*" element={<RecruiterRouters />} />
			</Routes>
		</>
	);
}
