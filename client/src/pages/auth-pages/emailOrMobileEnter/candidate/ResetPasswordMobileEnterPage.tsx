import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
	setLoading,
	setLoaded,
} from "../../../../redux/slice/loaderSlice/isLoading";
import EmailOrMobile from "../../../../components/form/EmailOrMobile";
import { passwordResetMobileCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import Swal from "sweetalert2";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import TopNavBarCandidate from "../../../../components/navBar/TopNavBarCandidate";
import Footer from "../../../../components/footer/Footer";

function ResetPasswordMobileEnterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const mobileSchema = yup.object().shape({
		mobile: yup
			.string()
			.matches(/^[0-9]+$/, "Invalid mobile number")
			.required("Mobile number is required"),
	});

	const initialValues = {
		mobile: "",
	};

	const handleSubmit = async (values: any) => {
		try {
			dispatch(setLoading());
			const response = await passwordResetMobileCandidateApi(
				candidateData.email,
				values.mobile
			);

			Swal.fire({
				text: response?.message || `Otp sendeddd to mobile number ${values.mobile}`,
				confirmButtonText: "ok",
			}).then((res) => {

				if (res) {
					navigate("/candidate/passwordResetOtp");
				}
			});
		} finally {
			dispatch(setLoaded());
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
		{candidateData && <TopNavBarCandidate />}
		<EmailOrMobile
			handleSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={mobileSchema}
		/>
		{candidateData && <Footer />}
		</>
	);
}

export default ResetPasswordMobileEnterPage;
