import Models from "../../database/mongo/models";
import { INotificationDocument } from "../../database/mongo/models/notification";
import { INotification } from "../../types/notification";

const {  NotificationModel } = Models;

export = {
	createNotification: async (notificationData: INotification): Promise<INotificationDocument> => {
		const chatNotification = NotificationModel.buildNotification(notificationData);
		return await chatNotification.save();
	},

	getAllNotificationsCountByUserId: async (userId: string): Promise<number> => {
		const count = (await NotificationModel.countDocuments({targetUserId: userId}));
		return count;
	},

	getAllNotificationsByUserId: async (userId: string): Promise<INotificationDocument[] | []> => {
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
		console.log("clearAllNotificationsBySenderId ",response);
		
		return response;
	},

	getUnreadMessagesCount: async (receiverId: string,  senderId: string ): Promise<number> => {
		const count = await NotificationModel.countDocuments({ senderId, targetUserId: receiverId });
		return count;
	},
};
