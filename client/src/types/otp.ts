
export interface IOtp {
    otp: string;
}

export interface IEmailOrMobile {
    email?: string;
    mobile?: string;
}
export interface IEmail {
    email: string;
}

export interface IMobile {
    mobile: string;
}

export interface IOtpFromProps {
    email?: string;
    phone?: string;
    handleSubmit: (otp: string) => void;
}


export interface IEmailOrMobileProps {
    initialValue: IEmailOrMobile;
    handleSubmit: (values: IEmailOrMobile) => void;
}
