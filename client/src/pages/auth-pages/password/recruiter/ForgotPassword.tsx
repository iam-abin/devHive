import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../../utils/toastMessage";
import ForgotResetPasswordForm from "../../../../components/auth-components/password/ForgotResetPasswordForm";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { forgotPasswordRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";

const ForgotPassword: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();

	const handleSubmit = async (values: any) => {
		try {
      
			console.log("Submitted password:", values.password);
			dispatch(setLoading());
			const response = await forgotPasswordRecruiterApi(
				userId!,
				values.password
			);
			console.log("hiiii", response);
			// if (response.data.data === "pending") {
			// 	notify(response.data.message, "error");
			// 	return;
			// }
			notify(response.message, "success");
			navigate("/recruiter/signin");
		} catch (error: any) {
			console.error("Error during reset password submission:", error);
			notify(
				error.response?.data?.errors?.[0]?.message ||
					"An error occurred during reset password submission",
				"error"
			);
		} finally {
			dispatch(setLoaded());
		}
	};

	return <ForgotResetPasswordForm handleSubmit={handleSubmit} />;
};

export default ForgotPassword;
