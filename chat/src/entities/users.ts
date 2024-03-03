interface UserInterface {
	userId: string;
	name: string;
	email: string;
	profileImgUrl?: string;
	userType: string;
}

export class User {
	userId: string;
	name: string;
	email: string;
	profileImgUrl?: string;
	userType: string;

	constructor({
		userId,
		name,
		email,
		profileImgUrl,
		userType,
	}: UserInterface) {
		(this.userId = userId),
        (this.name = name),
        (this.email = email),
        (this.profileImgUrl = profileImgUrl),
        (this.userType = userType);
	}
}
