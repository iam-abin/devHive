import mongoose from 'mongoose';
import { INotification } from '../../../types/notification';

export interface INotificationDocument extends mongoose.Document {
    senderId: mongoose.Schema.Types.ObjectId;
    targetUserId: mongoose.Schema.Types.ObjectId;
    message: string;
}

const notificationSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        targetUserId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        message: String,
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    },
);

interface NotificationModel extends mongoose.Model<INotificationDocument> {
    buildNotification(attributes: INotification): INotificationDocument;
}

notificationSchema.statics.buildNotification = (attributes: INotification) => {
    return new NotificationModel({
        senderId: attributes.senderId,
        targetUserId: attributes.targetUserId,
        message: attributes.message,
    });
};

const NotificationModel = mongoose.model<INotificationDocument, NotificationModel>(
    'Notification',
    notificationSchema,
);

export { NotificationModel };
