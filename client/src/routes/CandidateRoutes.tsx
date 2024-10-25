import { Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer";
import Loading from "../components/loading/Loading";
import { checkUserRole } from "../utils/checkRole";


const PaymentFailed = lazy(()=> import("../pages/payment/PaymentFailed"))
const AuthCandidate = lazy(()=> import("../pages/auth/authUser/AuthCandidate"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const CandidateProfilePage = lazy(()=> import("../pages/profile/candidate/CandidateProfilePage"))
const AllJobsPage = lazy(()=> import("../pages/job/candidate/AllJobsPage"))
const JobDetailsPage = lazy(()=> import("../pages/job/JobDetailsPage"))
const OtpFormPage = lazy(()=> import("../pages/auth/otp/OtpFormPage"))
const EmailOrMobileEnterPage = lazy(()=> import("../pages/auth/emailOrMobileEnter/EnterEmailOrMobilePage"))
const UpdatePassword = lazy(()=> import("../pages/auth/password/UpdatePassword"))
const CandidateProfileEditPage = lazy(()=> import("../pages/profile/candidate/CandidateProfileEditPage"))
const AppliedJobsPage = lazy(()=> import("../pages/job/candidate/AppliedJobsPage"))
const JobApplicationDetailsPage = lazy(()=> import("../pages/job/candidate/JobApplicationDetailsPage"));

const RecruiterProfilePage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfilePage"))
const ChatPageCandidate = lazy(()=> import("../pages/chat/ChatPage"))

const PaymentPlans = lazy(()=> import("../pages/payment/PaymentPlans"))
const PaymentSuccessFul = lazy(()=> import("../pages/payment/PaymentSuccessFul"))
const NotFound = lazy(()=> import("../pages/Error/NotFound"))


function CandidateRoutes() {
	const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );
	
	const { isCandidate } = checkUserRole(loggedinUser)

	return (
		<>
			<Suspense fallback={<Loading />}>
				
				<Routes>
					<Route path="/" element={isCandidate? <LandingPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/profile" element={isCandidate? <CandidateProfilePage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/payment-plans" element={isCandidate? <PaymentPlans />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/payment-success" element={isCandidate? <PaymentSuccessFul />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/payment-failed" element={isCandidate? <PaymentFailed />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/edit-profile/" element={isCandidate? <CandidateProfileEditPage />: <Navigate to={"/candidate/landing"} />} />

					<Route path="/passwordResetMobile" element={isCandidate? <EmailOrMobileEnterPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/passwordResetOtp" element={isCandidate? <OtpFormPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/passwordReset" element={isCandidate? <UpdatePassword />: <Navigate to={"/candidate/landing"} />} />

					<Route path="/forgotPasswordEmail" element={!isCandidate? <EmailOrMobileEnterPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/forgotPasswordOtp/:email" element={!isCandidate? <OtpFormPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/forgotPassword/:userId" element={!isCandidate? <UpdatePassword />: <Navigate to={"/candidate/landing"} />} />
					
					<Route path="/landing" element={isCandidate?<Navigate to={"/candidate"} />: <LandingPage /> } />
					<Route path="/signin" element={isCandidate?<Navigate to={"/candidate"} />:<AuthCandidate /> } />
					<Route path="/signup" element={isCandidate? <Navigate to={"/candidate"} />:<AuthCandidate />} />
					<Route path="/otpSignupCandidate/:email" element={!isCandidate? <OtpFormPage /> :<Navigate to={"/candidate"} />} />

					<Route path="/all-jobs" element={isCandidate?<AllJobsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/job-details/:jobId" element={isCandidate?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/applied-jobs" element={isCandidate?<AppliedJobsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/application-details/:jobApplicationId" element={isCandidate?<JobApplicationDetailsPage />:<Navigate to={"/candidate/signin"} />} />
				
					<Route path="/recruiter-profile/:id" element={isCandidate? <RecruiterProfilePage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/chat/:recepientId" element={isCandidate?<ChatPageCandidate />:<Navigate to={"/candidate/signin"} />} />
					
					<Route path="*" element={<NotFound url={"/candidate"} />} />
				</Routes>
				
			</Suspense>
		</>
	);
}

export default CandidateRoutes;
