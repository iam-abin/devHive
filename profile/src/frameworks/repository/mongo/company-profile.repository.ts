import models from "../../database/mongo/models";
// import { blockUnBlockInterface } from "../../types/candidateInterface";

const { CompanyProfileModel } = models;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	createCompanyProfile: async (companyData: any): Promise<any> => {
		const {
			company_name,
			company_location,
			company_state,
			company_country,
			recruiterId,
		} = companyData;

		const userObject = CompanyProfileModel.buildCompany({
			company_name,
			company_location,
			company_state,
			company_country,
			recruiterId,
		});
		
		return await userObject.save();
	},

	getCompany: async (companyDetails: object): Promise<any> => {
		const company = await CompanyProfileModel.findOne(companyDetails);
		return company;
	},

	getById: async (id: string): Promise<any> => {
		const company = await CompanyProfileModel.findById(id);
		return company;
	},

	updateCompanyProfile: async (id: string, data: any): Promise<any> => {
		const company = await CompanyProfileModel.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
		return company;
	},

	uploadLogoPic: async (id: string, data: any): Promise<any> => {
		const company = await CompanyProfileModel.updateOne(
			{ _id: id },
			{ $set: { profile_image: data } }
		);
		return company;
	},
};

// export default repository();
