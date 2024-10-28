interface IUser {
    email: string;
    password: string;
    role: string;
}

export interface ISignup extends IUser {
    name: string;
    phone: number;
    otp?: number;
}

export type ISignin = IUser;

export interface IUpdatePassword {
    userId: string;
    password: string;
}
