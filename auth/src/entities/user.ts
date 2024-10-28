import { ISignup } from '../frameworks/types/user';

export class User {
    name: string;
    email: string;
    phone: number;
    password: string;
    role: string;
    otp: number;

    constructor({ name, email, phone, password, role, otp }: Required<ISignup>) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
        this.otp = otp;
    }
}
