import { useNavigate, useParams } from "react-router-dom";
import OtpEnterForm from "../../../../components/form/otpEnterForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { notify } from "../../../../utils/toastMessage";
import { verifySignupOtpRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";
import { setRecruiter } from "../../../../redux/slice/recruiterSlice/recruiterDataSlice";

function OtpFormPageSignup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();OtpEnterForm
	const { email } = useParams();

	// Provide a default value (empty string) if email is undefined
	const userEmail = email || "";

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const handleSubmit = async (otp: string) => {
		try {
			console.log("Submitted OTP:", otp);

			dispatch(setLoading());
			const response = await verifySignupOtpRecruiterApi(otp, userEmail);
			console.log("hiiii", response);
			console.log("hiiii", response.data);
			dispatch(setRecruiter(response));
			notify(response.message, "success");
			navigate("/recruiter");
		} catch (error: any) {
			console.error("Error during OTP submission:", error);

			notify(error.message || "An error occurred during OTP submission", "error");
		} finally {
			dispatch(setLoaded());
		}
	};
	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			{/* Pass email and handleSubmit as props to OtpEnterForm */}
			<OtpEnterForm email={userEmail} handleSubmit={handleSubmit} />
		</div>
	);
}

export default OtpFormPageSignup;
