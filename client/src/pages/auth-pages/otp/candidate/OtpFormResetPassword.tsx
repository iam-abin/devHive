import { useNavigate } from "react-router-dom";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetPasswordOtpCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/form/otpEnterForm";

function OtpFormResetPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const candidateData: any = useSelector(
		(store: RootState) => store.userReducer.authData
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
