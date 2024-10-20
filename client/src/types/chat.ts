export interface IChatRoom {
    users: string[];
}

export interface IMessage {
	senderId: string;
	roomId: string;
	textMessage: string;
}


export interface INotification {
	senderId: string;
	targetUserId: string;
	message: string;
}
