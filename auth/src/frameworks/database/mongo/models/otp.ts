// this model for storing nodemailer otp generating during signup email verification

import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Token
interface OtpAttributes {
	userId: string;
	otp: string;
	expiry: Date;
    createdAt: Date
}
// 2. An interface that describes the properties ,that a Token Document has
interface TokenDocument extends mongoose.Document {
	userId: string;
    token: string;
	createdAt: string;
}

// 3.
const tokenSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		token: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
        createdAt: {
			type: Date,
			default: Date.now(),
            expires: 3600  // 1 hour
		},
	},
	{
		// to reformat id and remove password,__v from response when converting to json (we can also use other approaches)
		toJSON: {
			transform(doc, ret: any) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

// 4. An interface that describes the properties ,that a token model has
interface TokenModel extends mongoose.Model<TokenDocument> {
	buildToken(attributes: OtpAttributes): TokenDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
tokenSchema.statics.buildToken = (attributes: OtpAttributes) => {
	return new TokenModel(attributes)
};

// 6. // 6.hover on 'Token' ,we can see that 'Token' is getting 'TokenMdel', ie,a Second arg indicate returning type
const TokenModel = mongoose.model<TokenDocument, TokenModel>("Tokens", tokenSchema);

export { TokenModel };
