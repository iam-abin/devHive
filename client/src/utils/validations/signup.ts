import * as Yup from "yup";
import { ISignup } from "../../types/user";

export const initialSignupValues: ISignup = {
	name: "",
	email: "",
	phone: "",
	password: "",
};

export const signupSchema = Yup.object().shape({
	name: Yup.string().matches(/^[^\s].*$/, 'Name cannot start with a space').min(3).required(),
	email: Yup.string().email().required(),
	phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required(),
	password: Yup.string().min(4).required(),
});

export type SignupFormSchemaType = Yup.ObjectSchema<ISignup>;
