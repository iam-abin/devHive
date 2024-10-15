interface UserInterface {
	userId: string;
	name: string;
	profileImgUrl?: string;
	role: string;
}

export class User {
	userId: string;
	name: string;
	profileImgUrl?: string;
	role: string;

	constructor({
		userId,
		name,
		profileImgUrl,
		role,
	}: UserInterface) {
		(this.userId = userId),
        (this.name = name),
        (this.profileImgUrl = profileImgUrl),
        (this.role = role);
	}
}
