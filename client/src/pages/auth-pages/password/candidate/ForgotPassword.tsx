import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	forgotPasswordCandidateApi,
} from "../../../../axios/apiMethods/auth-service/candidateAuth";
import { notify } from "../../../../utils/toastMessage";
import ForgotResetPasswordForm from "../../../../components/form/ForgotResetPasswordForm";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";

const ForgotPassword: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();

	const handleSubmit = async (values: any) => {
		try {
			dispatch(setLoading());
			const response = await forgotPasswordCandidateApi(
				userId!,
				values.password
			);
			notify(response.message, "success");
			navigate("/candidate/signin");
		}finally {
			dispatch(setLoaded());
		}
	};

	return <ForgotResetPasswordForm handleSubmit={handleSubmit} />;
};

export default ForgotPassword;
