import { SigninFormSchemaType } from "../utils/validations/signin";
import { SignupFormSchemaType } from "../utils/validations/signup";

export enum IRole {
	ADMIN = 'admin',
	CANDIDATE = 'candidate',
	RECRUITER = 'recruiter'
}

export interface IUser{
	email: string;
	password: string;
}

export interface ISignin extends IUser{
	role?: string
} 

export interface IAuth extends IUser {
	name: string;
	phone: number | string;
	role?: string
}


export interface ISigninProps {
    handleSubmit: (values: ISignin) => void;
    signinSchema: SigninFormSchemaType;
    initialSigninValues: ISignin;
}

export interface IAuthProps {
    handleSubmit: (values: Partial<IAuth>) => void;
    schemaValues: SignupFormSchemaType | SigninFormSchemaType;
    initialValues: Partial<IAuth>;
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
	role?: string;
	isActive: boolean;
}