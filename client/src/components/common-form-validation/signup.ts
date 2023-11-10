import * as Yup from "yup";

export const initialSignupValues = {
	name: "",
	email: "",
	phone: "",
	password: "",
};

export const signUpSchema = Yup.object().shape({
	name: Yup.string().matches(/^[^\s].*$/, 'Name cannot start with a space').min(3).required(),
	email: Yup.string().email().required(),
	phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required(),
	password: Yup.string().min(4).required(),
});