import { IUserData } from "../types/user";
import { ROLES } from "./constants";

export const checkUserRole = (loggedinUser: IUserData | null) => {
    let isCandidate: boolean = false;
    let isRecruiter: boolean = false;
    let isAdmin: boolean = false;

    if (loggedinUser) {
        isCandidate = loggedinUser?.role === ROLES.CANDIDATE;
        isRecruiter = loggedinUser?.role === ROLES.RECRUITER;
        isAdmin = loggedinUser?.role === ROLES.ADMIN;
    }

    return { isCandidate, isRecruiter, isAdmin };
};
