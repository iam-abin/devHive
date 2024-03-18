import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/toastMessage";
import * as yup from "yup";
import {
	setLoading,
	setLoaded,
} from "../../../../redux/slice/loaderSlice/isLoading";
import EmailOrMobile from "../../../../components/form/EmailOrMobile";
import { forgotPasswordEmailCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import Swal from "sweetalert2";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import Footer from "../../../../components/footer/Footer";
import TopNavBarCandidate from "../../../../components/navBar/TopNavBarCandidate";

function ForgotPasswordEmailEnterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const candidateData: any = useSelector((state: RootState) => {
		return state.candidateData.data;
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
			console.log("Email submitted:", values.email);

			dispatch(setLoading());
			const response = await forgotPasswordEmailCandidateApi(
				values.email
			);
			console.log("hiiii", response);

			Swal.fire({
				text:
					response?.message ||
					`Otp sendeddd to email ${values.email}`,
				confirmButtonText: "ok",
			}).then((res) => {
				console.log(res);

				if (res) {
					navigate(`/candidate/forgotPasswordOtp/${values.email}`);
				}
			});
		} catch (error: any) {
			console.error("Error during email submission:", error);
			// notify(error.response.data.errors[0].message, "error");
			notify(
				error.response.data.errors[0].message ||
					"An error occurred during email submission",
				"error"
			);
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
