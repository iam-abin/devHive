import { useNavigate } from "react-router-dom";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetPasswordOtpCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/form/otpEnterForm";
import Footer from "../../../../components/footer/Footer";
import TopNavBarCandidate from "../../../../components/navBar/TopNavBarCandidate";

function OtpFormResetPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const handleSubmit = async (otp: string) => {
		try {

			dispatch(setLoading());
			const response = await verifyResetPasswordOtpCandidateApi(
				candidateData?.phone,
				otp,
				candidateData.email
			);
			if (response.data === "pending") {
				notify(
					response.message ||
						"An error occurred during OTP submission",
					"error"
				);
				return;
			}
			notify(response?.message, "success");
			navigate("/candidate/passwordReset");
		} catch (error: any) {
			console.error("Error during OTP submission:", error);

			notify(
				error.response.data.errors[0].message || "An error occurred during OTP submission",
				"error"
			);
		} finally {
			dispatch(setLoaded());
		}

		if (isLoading) {
			return <Loading />;
		}
	};

	return (
		<>
		{/*isCandidateUrl && <TopNavBarCandidate /> */}
		<div>
			{/* Pass email and handleSubmit as props to OtpEnterForm */}
			<OtpEnterForm email={candidateData.phone} handleSubmit={handleSubmit} />
			
		</div>
		{/* isCandidateUrl && <Footer /> */}
		</>
	);
}

export default OtpFormResetPassword;
