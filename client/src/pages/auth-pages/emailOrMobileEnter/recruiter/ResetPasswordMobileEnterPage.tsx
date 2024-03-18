import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/toastMessage";
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

function ResetPasswordMobileEnterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
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

			console.log("Mobile number submitted:", values.mobile);

			const response = await passwordResetMobileCandidateApi(
				recruiterData.email,
				values.mobile
			);
			console.log("hiiii", response);

			Swal.fire({
				text: response?.message || `Otp sendeddd to mobile number ${values.mobile}`,
				confirmButtonText: "ok",
			}).then((res) => {
				console.log(res);

				if (res) {
					navigate('/recruiter/passwordResetOtp');
				}
			});
		} catch (error: any) {
			console.error("Error during mobile number submission:", error);
			// notify(error.response.data.errors[0].message, "error");
			notify(
				error.response.data.errors[0].message ||
					"An error occurred during mobile number submission",
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
		<EmailOrMobile
			handleSubmit={handleSubmit}
			initialValues={initialValues}
			validationSchema={mobileSchema}
		/>
	);
}

export default ResetPasswordMobileEnterPage;
