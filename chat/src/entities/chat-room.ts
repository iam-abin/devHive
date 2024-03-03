export interface ChatRoomInterface {
	users: string[];
}

export class ChatRoom {
	users: string[];

	constructor({ users }: ChatRoomInterface) {
		this.users = users;
	}
}
