import { useNavigate, useParams } from "react-router-dom";
import OtpEnterForm from "../../../../components/form/otpEnterForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducer";
import Loading from "../../../../components/loading/Loading";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/isLoading";
import { notify } from "../../../../utils/toastMessage";
import { verifySignupOtpRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";
import { setUser } from "../../../../redux/slice/user";

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
			dispatch(setLoading());
			const response = await verifySignupOtpRecruiterApi(otp, userEmail);
			dispatch(setUser(response));
			notify(response.message, "success");
			navigate("/recruiter");
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
