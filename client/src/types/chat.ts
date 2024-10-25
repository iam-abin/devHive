export interface IChatRoom {
	_id: string,
    users: string[];
	lastMessage: string
	createdAt: string
}

export interface IMessage {
	senderId: string;
	roomId: string;
	textMessage: string;
	read: boolean;
	
}


export interface INotification {
	senderId: string;
	targetUserId: string;
	message: string;
}
