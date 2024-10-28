import mongoose from 'mongoose';
import { IPaymentData } from '../../types/payment';

export interface IPaymentDocument extends mongoose.Document {
    candidateId: mongoose.Schema.Types.ObjectId;
    membershipPlanId: mongoose.Schema.Types.ObjectId;
}

const paymentSchema = new mongoose.Schema(
    {
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Candidate',
        },
        membershipPlanId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'MembershipPlan',
        },
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
    },
);

interface PaymentModel extends mongoose.Model<IPaymentDocument> {
    buildPayment(attributes: IPaymentData): IPaymentDocument;
}

paymentSchema.statics.buildPayment = (attributes: IPaymentData) => {
    return new PaymentModel({
        ...attributes,
    });
};

export const PaymentModel = mongoose.model<IPaymentDocument, PaymentModel>('Payment', paymentSchema);
