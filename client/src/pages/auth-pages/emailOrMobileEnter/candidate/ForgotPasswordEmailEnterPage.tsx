import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
	setLoading,
	setLoaded,
} from "../../../../redux/slice/isLoading";
import EmailOrMobile from "../../../../components/form/EmailOrMobile";
import { forgotPasswordEmailCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import Swal from "sweetalert2";
import { RootState } from "../../../../redux/reducer";
import Loading from "../../../../components/loading/Loading";
import Footer from "../../../../components/footer/Footer";
import TopNavBarCandidate from "../../../../components/navBar/TopNavBarCandidate";

function ForgotPasswordEmailEnterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const candidateData: any = useSelector((store: RootState) => {
		return store.userReducer.authData
	});

	const emailSchema = yup.object().shape({
		email: yup
			.string()
			.email("Invalid email address")
			.required("Email is required"),
	});

	const initialValues = {
		email: "",
	};

	const handleSubmit = async (values: any) => {
		try {
			dispatch(setLoading());
			const response = await forgotPasswordEmailCandidateApi(
				values.email
			);
			Swal.fire({
				text:
					response?.message ||
					`Otp sendeddd to email ${values.email}`,
				confirmButtonText: "ok",
			}).then((res) => {
				if (res) {
					navigate(`/candidate/forgotPasswordOtp/${values.email}`);
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
				validationSchema={emailSchema}
			/>
			{candidateData && <Footer />}

			
		</>
	);
}

export default ForgotPasswordEmailEnterPage;
