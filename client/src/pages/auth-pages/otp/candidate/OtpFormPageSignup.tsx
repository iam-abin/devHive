import { useNavigate, useParams } from "react-router-dom";
import { setLoaded, setLoading } from "../../../../redux/slice/loaderSlice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { verifySignupOtpCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import { setCandidate } from "../../../../redux/slice/candidateSlice/candidateDataSlice";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/form/otpEnterForm";

function OtpFormPageSignup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { email } = useParams();

	// Provide a default value (empty string) if email is undefined
	const userEmail = email || "";

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const handleSubmit = async (otp: string) => {
		try {

			dispatch(setLoading());
			const response = await verifySignupOtpCandidateApi(otp, userEmail);
			dispatch(setCandidate(response));
			notify(response.message, "success");
			navigate("/candidate");
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

export default OtpFormPageSignup;
