import schemas from "../../database/mongo/models";

const {  NotificationModel } = schemas;

export = {
	createNotification: async (notificationData: any) => {
		console.log("notificationData inside create Notification ", notificationData);
		const chatNotification = NotificationModel.buildNotification(notificationData);

		console.log("chatNotification inside create Notification ", chatNotification);
		return await chatNotification.save();
	},

	getAllNotificationsByUserId: async (userId: string) => {
		const chatNotifications = await NotificationModel.find({_id: userId}).sort({createdAt: -1});
		return chatNotifications;
	},

	clearAllNotificationsByUserId: async (userId: string) => {
        const response = await NotificationModel.findByIdAndDelete(userId);
		return response;
	},
};
