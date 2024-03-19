import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new Chat
import { MembershipPlan } from "../../../../entities/membership-plan";
// 2. An interface that describes the properties ,that a Chat Document has
interface MembershipPlansDocument extends mongoose.Document {
	name: string;
	features: [string];
	description: string;
	price: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}


// 3.
const membershipPlansSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		features: {
			type: Array<String>,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
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
	}
);

// 4. An interface that describes the properties ,that a user model has
interface MembershipPlansModel extends mongoose.Model<MembershipPlansDocument> {
	buildMembershipPlan(attributes: MembershipPlan): MembershipPlansDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
membershipPlansSchema.statics.buildMembershipPlan = (attributes: MembershipPlan) => {
	return new MembershipPlansModel({
		_id: attributes.membershipPlanId,
		name: attributes.name,
		features: attributes.features,
		description: attributes.description,
		price: attributes.price,
		isActive: attributes.isActive,
	});
};
// 6. // 6.hover on 'Premium' ,we can see that 'Premium' is getting 'MembershipPlansModel', ie,a Second arg indicate returning type
const MembershipPlansModel = mongoose.model<MembershipPlansDocument, MembershipPlansModel>(
	"membershipPlan",
	membershipPlansSchema
);

export { MembershipPlansModel };
