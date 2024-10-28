export interface IOtp {
    otp: string;
    email: string;
}

export interface IMobileOtp extends IOtp {
    phone: number;
}
