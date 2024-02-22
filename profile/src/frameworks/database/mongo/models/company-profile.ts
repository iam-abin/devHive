import mongoose from "mongoose";

// 1. An interface that describes the properties ,that are requried to create a new Company
interface CompanyAttributes {
	company_name: string;
	email?: string;
	// logo?: string;
	website?: string;
	company_location: string;
	company_state?: string;
	company_country?: string;
	description?: string;
	isActive?: boolean;
	recruiterId?: string;
}
// 2. An interface that describes the properties ,that a Company Document has
interface CompanyDocument extends mongoose.Document {
	company_name: string;
	email: string;
	// logo: string;
	website: string;
	company_location: string;
	company_state: string;
	company_country: string;
	description: string;
	isActive: boolean;
	recruiters:  mongoose.Schema.Types.ObjectId[];
	createdAt: string;
	updatedAt: string;
}

// 3.
const companySchema = new mongoose.Schema(
	{
		company_name:{
			type: String,
			required: true
		},
		email: String,
		// logo: String,
		website: String,
		company_location: {
			type: String,
			required: true
		},
		company_state: String,
		company_country: String,
		description: String,
		isActive: {
            type:Boolean,
            default:true
        },
		recruiters: Array,
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
	console.log("inside build candidate ", attributes);
	const recruiterId =  new mongoose.Types.ObjectId(attributes.recruiterId);
	
	return new CompanyProfileModel( {...attributes, recruiters: recruiterId? [recruiterId] : []} );
};

// 6. // 6.hover on 'Company' ,we can see that 'Company' is getting 'CompanyMdel', ie,a Second arg indicate returning type
const CompanyProfileModel = mongoose.model<CompanyDocument, CompanyProfileModel>(
	"Company",
	companySchema
);

export { CompanyProfileModel };
