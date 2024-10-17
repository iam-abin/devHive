import mongoose from "mongoose";
import { IPayment } from "../../../types/payment";


export interface IPaymentDocument extends mongoose.Document {
	candidateId: string;
	membershipPlanId: string;
	stripeId: string;
}


const paymentSchema = new mongoose.Schema(
	{
		candidateId: String,
		membershipPlanId: String,
		stripeId: String,
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
	}
);


interface PaymentModel extends mongoose.Model<IPaymentDocument> {
	buildPayment(attributes: IPayment): IPaymentDocument;
}


paymentSchema.statics.buildPayment = (attributes: IPayment) => {
	return new PaymentModel({
		candidateId: attributes.candidateId,
		membershipPlanId: attributes.membershipPlanId,
		stripeId: attributes.stripeId,
	});
};

const PaymentModel = mongoose.model<IPaymentDocument, PaymentModel>(
	"Payment",
	paymentSchema
);

export { PaymentModel };
