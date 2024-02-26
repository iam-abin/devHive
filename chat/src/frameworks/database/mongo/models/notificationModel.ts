import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new User
interface NotificationAttributes {
	userId: string;
	targetUserId: string;
	message: string;
	// email: string;
	profileImgUrl: number;
	userType: string;
}
// 2. An interface that describes the properties ,that a User Document has
interface NotificationDocument extends mongoose.Document {
	userId: mongoose.Schema.Types.ObjectId;
	targetUserId: mongoose.Schema.Types.ObjectId;
	message: string;
	profileImgUrl: number;
	userType: string;
	// isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// 3.
const notificationSchema = new mongoose.Schema(
	{
		userId: mongoose.Schema.Types.ObjectId,
		targetUserId: mongoose.Schema.Types.ObjectId,
		message: String,
		profileImgUrl: String,
		userType: {
			type: String,
			required: true,
			enum: ["candidate", "recruiter"],
		},
		// isActive: {
		// 	type: Boolean,
		// 	default: true,
		// },
	},
	{
		// to reformat id and remove password,__v from response when converting to json (we can also use other approaches)
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
		timestamps: true,
	}
);

// 4. An interface that describes the properties ,that a user model has
interface NotificationModel extends mongoose.Model<NotificationDocument> {
	buildNotification(attributes: NotificationAttributes): NotificationDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
notificationSchema.statics.buildNotification = (
	attributes: NotificationAttributes
) => {
	return new NotificationModel({
		// to create a new user document
		userId: attributes.userId,
		targetUserId: attributes.targetUserId,
		message: attributes.message,
		// email: attributes.email,
		profileImgUrl: attributes.profileImgUrl,
		userType: attributes.userType,
	});
};

// 6. // 6.hover on 'Notification' ,we can see that 'Notification' is getting 'NotificationModel', ie,a Second arg indicate returning type
const NotificationModel = mongoose.model<
	NotificationDocument,
	NotificationModel
>("Notification", notificationSchema);

export { NotificationModel };
