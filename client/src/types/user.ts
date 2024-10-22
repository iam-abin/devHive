import { SigninFormSchemaType } from "../utils/validations/signin";
import { SignupFormSchemaType } from "../utils/validations/signup";

interface IUser{
	email: string;
	password: string;
}

export interface ISignin extends IUser{} 

export interface IAuth extends IUser {
	name: string;
	phone: number | string;
}


export interface ISigninProps {
    handleSubmit: (values: ISignin) => void;
    signinSchema: SigninFormSchemaType;
    initialSigninValues: ISignin;
}

export interface IAuthProps {
    handleSubmit: (values: IAuth) => void;
    schemaValues: SignupFormSchemaType | SigninFormSchemaType;
    initialValues: IAuth;
	authType: "signin"|"signup"
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