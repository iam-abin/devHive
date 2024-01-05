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
import OtpEnterForm from "../../../../components/auth-components/otp/otpEnterForm";

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
			console.log("Submitted OTP:", otp);

			dispatch(setLoading());
			const response = await verifyResetPasswordOtpCandidateApi(
				candidateData?.phone,
				otp,
				candidateData.email
			);
			console.log("hiiii", response);
			console.log("hiiii", response.data);
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
				error.errors[0].message || "An error occurred during OTP submission",
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
		<div>
			{/* Pass email and handleSubmit as props to OtpEnterForm */}
			<OtpEnterForm email={candidateData.phone} handleSubmit={handleSubmit} />
		</div>
	);
}

export default OtpFormResetPassword;
