import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new Chat
interface PaymentAttributes {
	candidateId: string;
	membershipPlanId: string;
	stripeId: string;
}
// 2. An interface that describes the properties ,that a Chat Document has
interface PaymentDocument extends mongoose.Document {
	candidateId: string;
	membershipPlanId: string;
	stripeId: string;
	createdAt: Date;
	updatedAt: Date;
}

// 3.
const paymentSchema = new mongoose.Schema(
	{
		candidateId: String,
		membershipPlanId: String,
		stripeId: String,
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
interface PaymentModel extends mongoose.Model<PaymentDocument> {
	buildPayment(attributes: PaymentAttributes): PaymentDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
paymentSchema.statics.buildPayment = (attributes: PaymentAttributes) => {
	return new PaymentModel({
		candidateId: attributes.candidateId,
		membershipPlanId: attributes.membershipPlanId,
		stripeId: attributes.stripeId,
	});
};
// 6. // 6.hover on 'Payment' ,we can see that 'Payment' is getting 'PaymentModel', ie,a Second arg indicate returning type
const PaymentModel = mongoose.model<PaymentDocument, PaymentModel>(
	"Payment",
	paymentSchema
);

export { PaymentModel };
