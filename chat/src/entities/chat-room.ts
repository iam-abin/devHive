import { IChatRoom } from "../frameworks/types/chatRoom";


export class ChatRoom {
	users: string[];

	constructor({ users }: IChatRoom) {
		this.users = users;
	}
}
