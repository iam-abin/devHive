import { IUser } from './user';

export interface IRecruiterProfile extends IUser {
    gender: string;
    profileImage: string;
    about: string;

    companyName: string;
    companyWebsite: string;
    companyLocation: string;
    companyState: string;
    companyCountry: string;
}
