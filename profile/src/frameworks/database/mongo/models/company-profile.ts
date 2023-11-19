import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Company
interface CompanyAttributes {
	name: string;
	email: string;
	logo: string;
	website: string;
	location: string;
	state: string;
	country: string;
	description: string;
	isActive: boolean;
	// companyId: string;
}
// 2. An interface that describes the properties ,that a Company Document has
interface CompanyDocument extends mongoose.Document {
	name: string;
	email: string;
	logo: string;
	website: string;
	location: string;
	state: string;
	country: string;
	description: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// 3.
const companySchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		logo: String,
		website: String,
		location: String,
		state: String,
		country: String,
		description: String,
		isActive: {
            type:Boolean,
            default:true
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

// 4. An interface that describes the properties ,that a company model has
interface CompanyProfileModel extends mongoose.Model<CompanyDocument> {
	buildCompany(attributes: CompanyAttributes): CompanyDocument;
}

// 5.In Mongoose, you can also add custom functions to a model using statics.
companySchema.statics.buildCompany = (attributes: CompanyAttributes) => {
	return new CompanyProfileModel({ attributes });
};

// 6. // 6.hover on 'Company' ,we can see that 'Company' is getting 'CompanyMdel', ie,a Second arg indicate returning type
const CompanyProfileModel = mongoose.model<CompanyDocument, CompanyProfileModel>(
	"Company",
	companySchema
);

export { CompanyProfileModel };
