import * as Yup from "yup";
import { IUser } from "../../types/user";

export const initialSigninValues: IUser = {
    email: "",
    password: "",

};

export const signinSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).required(),
});

export type SigninFormSchemaType = Yup.ObjectSchema<IUser>;
