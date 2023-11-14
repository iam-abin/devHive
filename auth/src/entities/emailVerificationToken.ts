import { emailVerificationTokenInterface } from "../frameworks/types/emailVerificationTokenInterface";

export class EmailVerificationToken {
	userId: string;
	token: string;
	email: string;

	constructor({ userId, token, email}: emailVerificationTokenInterface) {
		this.userId = userId;
		this.token = token;
		this.email = email
	}
}
