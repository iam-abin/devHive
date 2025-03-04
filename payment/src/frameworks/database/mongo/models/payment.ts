import mongoose from 'mongoose';
import { IPayment } from '../../../types/payment';

export interface IPaymentDocument extends mongoose.Document {
    candidateId: mongoose.Schema.Types.ObjectId;
    membershipPlanId: mongoose.Schema.Types.ObjectId;
}

const paymentSchema = new mongoose.Schema(
    {
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        membershipPlanId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        stripeId: {
            type: String,
            required: true,
        },
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

interface PaymentModel extends mongoose.Model<IPaymentDocument> {
    buildPayment(attributes: IPayment): IPaymentDocument;
}

paymentSchema.statics.buildPayment = (attributes: IPayment) => {
    return new PaymentModel(attributes);
};

const PaymentModel = mongoose.model<IPaymentDocument, PaymentModel>('Payment', paymentSchema);

export { PaymentModel };
