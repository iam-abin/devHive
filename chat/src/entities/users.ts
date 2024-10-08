interface UserInterface {
	userId: string;
	name: string;
	profileImgUrl?: string;
	userType: string;
}

export class User {
	userId: string;
	name: string;
	profileImgUrl?: string;
	userType: string;

	constructor({
		userId,
		name,
		profileImgUrl,
		userType,
	}: UserInterface) {
		(this.userId = userId),
        (this.name = name),
        (this.profileImgUrl = profileImgUrl),
        (this.userType = userType);
	}
}
