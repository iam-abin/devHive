import * as Yup from "yup";

export const initialSigninValues = {
	email: "",
	password: "",
};

export const signInSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().min(4).required(),
});