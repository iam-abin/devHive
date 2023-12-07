import schemas from "../../database/mongo/models"
// import { blockUnBlockInterface } from "../../types/candidateInterface";

const { CompanyProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createCompanyProfile: async (companyData: any) => {
		console.log("inside createCompany fn in profile service", companyData);
		const {company_name, company_location, company_state, company_country} = companyData
		const userObject = CompanyProfileModel.buildCompany({company_name, company_location, company_state, company_country});
		return await userObject.save();
	},

	getCompany: async (companyDetails: object) => {
		const company = await CompanyProfileModel.findOne(companyDetails);
		return company;
	},

	getById: async (id: string) => {
		const company = await CompanyProfileModel.findById(id);
		return company;
	},

	// getAllCompanies: async () => {
	// 	const companys = await CompanyProfileModel.find({});
	// 	return companys;
	// },

	updateCompanyProfile: async (id: string, data: any) => {
		const company = await CompanyProfileModel.findOneAndUpdate({ "_id": id }, { $set: data }, {new: true});
		return company;
	},

	uploadLogoPic : async (id: string, data: any)=>{
		const company = await CompanyProfileModel.updateOne({ "_id": id }, { $set:{ profile_image: data }});
		return company;
	},
};

// export default repository();
