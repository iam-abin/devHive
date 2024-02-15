import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/toastMessage";
import * as yup from "yup";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { forgotPasswordEmailRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";
import EmailOrMobile from "../../../../components/form/EmailOrMobile";
import Swal from "sweetalert2";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";

function ForgotPasswordEmailEnterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

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

			console.log("Email submitted:", values.email);

			const response = await forgotPasswordEmailRecruiterApi(
				values.email
			);
			console.log("hiiii", response);
			Swal.fire({
				text: response?.message || `Otp sendeddd to email ${values.email}`,
				confirmButtonText: "ok",
			  }).then((res) => {
				console.log(res);
		
				if (res) {
				  navigate(`/recruiter/forgotPasswordOtp/${values.email}`);
				}
			  });

		} catch (error: any) {
			console.error("Error during email submission:", error);
			// notify(error.errors[0].message, "error");
			notify(
				error.response?.data?.errors?.[0]?.message ||
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

	return <EmailOrMobile handleSubmit={handleSubmit} initialValues={initialValues} validationSchema={emailSchema} />;
}

export default ForgotPasswordEmailEnterPage;
