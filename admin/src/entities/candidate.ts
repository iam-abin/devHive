import { IUser } from "../frameworks/types/user";

export class CandidateProfile {
	userId: string;
    name: string;
    email: string;
    phone: number;
    role: string;
    isActive: boolean;
	constructor({
		userId,
		name,
		email,
		phone,
		role,
		isActive,
	}: IUser) {
		(this.userId = userId),
		(this.name = name),
			(this.email = email),
			(this.phone = phone),
			(this.role = role);
			(this.isActive = isActive)
	}
}
