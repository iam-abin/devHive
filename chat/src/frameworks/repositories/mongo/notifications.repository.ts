import Models from "../../database/mongo/models";

const {  NotificationModel } = Models;

export = {
	createNotification: async (notificationData: any) => {
		
		const chatNotification = NotificationModel.buildNotification(notificationData);
		
		return await chatNotification.save();
	},

	getAllNotificationsCountByUserId: async (userId: string) => {
		
		const count = (await NotificationModel.find({targetUserId: userId})).length;
		
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
		
		return count;
	},
};
