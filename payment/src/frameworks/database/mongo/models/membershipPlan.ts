import mongoose from "mongoose";
import { IMembershipPlan } from "../../../types/membershipPlan";

export interface IMembershipPlanDocument extends mongoose.Document, Omit<IMembershipPlan, "membershipPlanId">{
	_id: mongoose.Schema.Types.ObjectId;
}


const membershipPlanSchema = new mongoose.Schema(
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


interface MembershipPlanModel extends mongoose.Model<IMembershipPlanDocument> {
	buildMembershipPlan(attributes: IMembershipPlan): IMembershipPlanDocument;
}


membershipPlanSchema.statics.buildMembershipPlan = (attributes: IMembershipPlan) => {
	return new MembershipPlanModel({
		_id: attributes.membershipPlanId,
		name: attributes.name,
		features: attributes.features,
		description: attributes.description,
		price: attributes.price,
		isActive: attributes.isActive,
	});
};

const MembershipPlanModel = mongoose.model<IMembershipPlanDocument, MembershipPlanModel>(
	"membershipPlan",
	membershipPlanSchema
);

export { MembershipPlanModel };
