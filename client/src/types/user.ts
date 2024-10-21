export interface IUserProfile {
    userId: string;
    email: string;
    name: string;
    phone: number;
    // role: string;
    isActive: boolean;
}


interface IUser{
	email: string;
	password: string;
	// role: string;
}


export interface ISignup extends IUser {
	name: string;
	phone: number;
	otp?: number;
}

export interface ISignin extends IUser{} 



export interface IUpdatePassword {
	userId: string;
	password: string;
}