import * as Yup from "yup";
import { IEmail, IMobile } from "../../types/otp";
// import { ISignin } from "../../types/user";

export const otpSchema = Yup.object().shape({
    otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required"),
});

// export const initialOtp: ISignin = {
//     email: "",
//     password: "",
// };
export type OtpMobileSchemaType = Yup.ObjectSchema<IMobile>;

export const mobileSchema: OtpMobileSchemaType = Yup.object().shape({
    mobile: Yup
        .string()
        .matches(/^[0-9]+$/, "Invalid mobile number")
        .required("Mobile number is required"),
});

export type OtpEmailSchemaType = Yup.ObjectSchema<IEmail>;

export const emailSchema: OtpEmailSchemaType = Yup.object().shape({
    email: Yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});