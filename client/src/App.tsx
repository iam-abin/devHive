import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import CandidateRoutes from "./routes/CandidateRoutes";
import RecruiterRouters from "./routes/RecruiterRouters";
import AdminRoutes from "./routes/AdminRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducer/reducer";
import NotFound from "./components/Error/NotFound";
// import OtpForm from "./pages/Otp";

export default function App() {
	const isCandidateLoggedIn = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const isRecruiterLoggedIn = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	return (
		<>
			<ToastContainer className="mt-10" />
			<Routes>
				<Route path="/" element={isCandidateLoggedIn?<Navigate to="/candidate" /> :( isRecruiterLoggedIn? <Navigate to="/recruiter" />: <LandingPage /> )} />
				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route path="/candidate/*" element={<CandidateRoutes />} />
				<Route path="/recruiter/*" element={<RecruiterRouters />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
			{/* <OtpForm /> */}
		</>
	);
}
