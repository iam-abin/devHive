import { Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/reducer";
import Loading from "../components/loading/Loading";


const PaymentFailed = lazy(()=> import("../pages/payment/PaymentFailed"))
const CandidateSigninPage = lazy(()=> import("../pages/auth/signin/CandidateSigninPage"))
const CandidateSignupPage = lazy(()=> import("../pages/auth/signup/CandidateSignupPage"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const CandidateProfilePage = lazy(()=> import("../pages/profile/candidate/CandidateProfilePage"))
const AllJobsPage = lazy(()=> import("../pages/job/candidate/AllJobsPage"))
const JobDetailsPage = lazy(()=> import("../pages/job/candidate/JobDetailsPage"))
const OtpFormPage = lazy(()=> import("../pages/auth/otp/OtpFormPage"))
const EmailOrMobileEnterPage = lazy(()=> import("../pages/auth/emailOrMobileEnter/EnterEmailOrMobilePage"))
const UpdatePassword = lazy(()=> import("../pages/auth/password/UpdatePassword"))
const CandidateProfileEditPage = lazy(()=> import("../pages/profile/candidate/CandidateProfileEditPage"))
const AppliedJobsPage = lazy(()=> import("../pages/job/candidate/AppliedJobsPage"))
const JobApplicationDetailsPage = lazy(()=> import("../pages/job/candidate/JobApplicationDetailsPage"));

const RecruiterProfilePage = lazy(()=> import("../pages/profile/recruiter/RecruiterProfilePage"))
const ChatPageCandidate = lazy(()=> import("../pages/chat/ChatPageCandidate"))

const PaymentPlans = lazy(()=> import("../pages/payment/PaymentPlans"))
const PaymentSuccessFul = lazy(()=> import("../pages/payment/PaymentSuccessFul"))
const NotFound = lazy(()=> import("../pages/Error/NotFound"))


function CandidateRoutes() {
	const loggedinUser = useSelector(
        (store: RootState) => store.userReducer.authData
    );

	return (
		<>
			<Suspense fallback={<Loading />}>
				
				<Routes>
					<Route path="/" element={loggedinUser? <LandingPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/profile" element={loggedinUser? <CandidateProfilePage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/payment-plans" element={loggedinUser? <PaymentPlans />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/payment-success" element={loggedinUser? <PaymentSuccessFul />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/payment-failed" element={loggedinUser? <PaymentFailed />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/edit-profile/" element={loggedinUser? <CandidateProfileEditPage />: <Navigate to={"/candidate/landing"} />} />

					<Route path="/passwordResetMobile" element={loggedinUser? <EmailOrMobileEnterPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/passwordResetOtp" element={loggedinUser? <OtpFormPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/passwordReset" element={loggedinUser? <UpdatePassword />: <Navigate to={"/candidate/landing"} />} />

					<Route path="/forgotPasswordEmail" element={!loggedinUser? <EmailOrMobileEnterPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/forgotPasswordOtp/:email" element={!loggedinUser? <OtpFormPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/forgotPassword/:userId" element={!loggedinUser? <UpdatePassword />: <Navigate to={"/candidate/landing"} />} />
					
					<Route path="/landing" element={loggedinUser?<Navigate to={"/candidate"} />: <LandingPage /> } />
					<Route path="/signin" element={loggedinUser?<Navigate to={"/candidate"} />:<CandidateSigninPage /> } />
					<Route path="/signup" element={loggedinUser? <Navigate to={"/candidate"} />:<CandidateSignupPage />} />
					<Route path="/otpSignupCandidate/:email" element={!loggedinUser? <OtpFormPage /> :<Navigate to={"/candidate"} />} />

					<Route path="/all-jobs" element={loggedinUser?<AllJobsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/job-details/:jobId" element={loggedinUser?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/applied-jobs" element={loggedinUser?<AppliedJobsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/application-details/:jobApplicationId" element={loggedinUser?<JobApplicationDetailsPage />:<Navigate to={"/candidate/signin"} />} />
				
					<Route path="/recruiter-profile/:id" element={loggedinUser? <RecruiterProfilePage />: <Navigate to={"/candidate/signin"} />} />
					<Route path="/chat/:recepientId" element={loggedinUser?<ChatPageCandidate />:<Navigate to={"/candidate/signin"} />} />
					
					<Route path="*" element={<NotFound url={"/candidate"} />} />
				</Routes>
				
			</Suspense>
		</>
	);
}

export default CandidateRoutes;
