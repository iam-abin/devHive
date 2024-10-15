interface User{
	email: string;
	password: string;
	role: string;
}

export interface ISignup extends User {
	name: string;
	phone: number;
}

export interface ISignin extends User{} 



export interface IUpdatePassword {
	userId: string;
	password: string;
}