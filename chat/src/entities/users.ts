import { IUser } from '../frameworks/types/user';

export class User {
    userId: string;
    name: string;
    profileImage: string;
    role: string;

    constructor({ userId, name, profileImage, role }: IUser) {
        this.userId = userId;
        this.name = name;
        this.profileImage = profileImage;
        this.role = role;
    }
}
