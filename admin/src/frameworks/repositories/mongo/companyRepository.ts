import Models from "../../database/models"

const { CompanyProfileModel } = Models;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	 createCompany: async (companyData: any) => {
		
		// const {name, email, phone, userType, isActive} = companyData
		// const companyObject = new CompanyProfileModel({name, email, phone, userType, isActive});
		const companyObject = new CompanyProfileModel(companyData);
		return await companyObject.save();
	},

	blockUnblock: async (companyId: string) => {
		const company = await CompanyProfileModel.findById(companyId);
		
		if (!company) throw new Error("Company not found");

		company.isActive = !company.isActive;

		return await company.save();
	},

	getById: async (id: string) => {
		const company = await CompanyProfileModel.findById(id);
		return company;
	},

	getAllCompanies: async () => {
		const companies = await CompanyProfileModel.find({});
		return companies;
	},
};

// export default repository();
