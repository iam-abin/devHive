import mongoose from "mongoose";
// 1. An interface that describes the properties ,that are requried to create a new Chat
interface PremiumAttributes {
	name: String;
	features: [string];
	description: string;
	price: number;
	isActive: boolean;
}
// 2. An interface that describes the properties ,that a Chat Document has
interface PremiumDocument extends mongoose.Document {
	name: string;
	features: [string];
	description: string;
	price: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

// 3.
const premiumSchema = new mongoose.Schema(
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
interface PremiumModel extends mongoose.Model<PremiumDocument> {
	buildPremium(attributes: PremiumAttributes): PremiumDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
premiumSchema.statics.buildPremium = (attributes: PremiumAttributes) => {
	return new PremiumModel({
		name: attributes.name,
		features: attributes.features,
		description: attributes.description,
		price: attributes.price,
	});
};
// 6. // 6.hover on 'Premium' ,we can see that 'Premium' is getting 'PremiumModel', ie,a Second arg indicate returning type
const PremiumModel = mongoose.model<PremiumDocument, PremiumModel>(
	"Premium",
	premiumSchema
);

export { PremiumModel };
