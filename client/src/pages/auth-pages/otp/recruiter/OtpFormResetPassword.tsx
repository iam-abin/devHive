import { useNavigate } from "react-router-dom";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/form/otpEnterForm";
import { verifyResetPasswordOtpRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";

function OtpFormResetPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	const handleSubmit = async (otp: string) => {
		try {

			dispatch(setLoading());
			const response = await verifyResetPasswordOtpRecruiterApi(
				recruiterData?.phone,
				otp,
				recruiterData?.email
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
			navigate("/recruiter/passwordReset");
		} catch (error: any) {
			console.error("Error during OTP submission:", error);

			notify(
				error.response.data.errors[0].messagee || "An error occurred during OTP submission",
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
			<OtpEnterForm phone={recruiterData?.phone} handleSubmit={handleSubmit} />
		</div>
	);
}

export default OtpFormResetPassword;
