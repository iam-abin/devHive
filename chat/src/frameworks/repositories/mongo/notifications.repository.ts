import schemas from "../../database/mongo/models";

const {  NotificationModel } = schemas;

export = {
	createNotification: async (notificationData: any) => {
		console.log("notificationData inside create Notification ", notificationData);
		const chatNotification = NotificationModel.buildNotification(notificationData);

		console.log("chatNotification inside create Notification ", chatNotification);
		return await chatNotification.save();
	},

	getAllNotificationsCountByUserId: async (userId: string) => {
		// const count = await NotificationModel.aggregate([
		// 	{$match: {targetUserId: userId}},{$count: "countOfNotifications"}
		// ]);
		const count = (await NotificationModel.find({targetUserId: userId})).length;
		console.log("in getAllNotificationsCountByUserId", count);
		
		return count;
	},

	getAllNotificationsByUserId: async (userId: string) => {
		const chatNotifications = await NotificationModel.find({targetUserId: userId}).populate({
			path: "senderId",
			model: "User",
		})
		.sort({createdAt: -1});
		
		return chatNotifications;
	},
	
	clearAllNotificationsByUserId: async (userId: string) => {
        const response = await NotificationModel.deleteMany({targetUserId: userId});
		return response;
	},

	clearAllNotificationsBySenderId: async (senderId: string, receiverId: string) => {
        const response = await NotificationModel.deleteMany({senderId , targetUserId: receiverId});
		return response;
	},

	getUnreadMessagesCount: async (senderId: string, receiverId: string) => {
		const count = await NotificationModel.countDocuments({senderId, targetUserId: receiverId});
		console.log("unread count ", count);
		
		return count;
	},
};
