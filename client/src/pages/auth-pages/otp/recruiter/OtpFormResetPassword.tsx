import { useNavigate, useParams } from "react-router-dom";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/auth-components/otp/otpEnterForm";
import { verifyResetPasswordOtpRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";

function OtpFormResetPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { email } = useParams();

	// Provide a default value (empty string) if email is undefined
	const userEmail = email || "";

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	const handleSubmit = async (otp: string) => {
		try {
			console.log("Submitted OTP:", otp);

			dispatch(setLoading());
			const response = await verifyResetPasswordOtpRecruiterApi(
				recruiterData?.phone,
				otp,
				recruiterData?.email
			);
			console.log("hiiii", response);
			console.log("hiiii", response.data);
			// if(response.data.data == "pending") {
			//     notify(response.data.message, 'error');
			//     return
			//   }
			notify(response?.message, "success");
			navigate("/recruiter/passwordReset");
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
			<OtpEnterForm email={userEmail} handleSubmit={handleSubmit} />
		</div>
	);
}

export default OtpFormResetPassword;
