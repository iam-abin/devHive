import { IUser } from "../frameworks/types/user";


export class User {
	userId: string;
	name: string;
	profile_image: string;
	role: string;

	constructor({
		userId,
		name,
		profile_image,
		role,
	}: IUser) {
		(this.userId = userId),
        (this.name = name),
        (this.profile_image = profile_image),
        (this.role = role);
	}
}
