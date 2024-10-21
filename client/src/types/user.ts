import { SigninFormSchemaType } from "../utils/validations/signin";
import { SignupFormSchemaType } from "../utils/validations/signup";

interface IUser{
	email: string;
	password: string;
}

export interface ISignin extends IUser{} 

export interface ISignup extends IUser {
	name: string;
	phone: number | string;
}


export interface ISigninProps {
    handleSubmit: (values: ISignin) => void;
    signinSchema: SigninFormSchemaType;
    initialSigninValues: ISignin;
}

export interface ISignupProps {
    handleSubmit: (values: ISignup) => void;
    signupSchema: SignupFormSchemaType;
    initialSignupValues: ISignup;
}


export interface IUpdatePassword {
	userId: string;
	password: string;
}

export interface IUserData {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
}