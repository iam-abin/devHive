import schemas from "../../database/models"
import { blockUnBlockInterface } from "../../types/candidateInterface";

const { CompanyProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createCompany: async (companyData: any) => {
		console.log("inside createCompany fn in admin service", companyData);
		
		// const {name, email, phone, userType, isActive} = companyData
		// const companyObject = new CompanyProfileModel({name, email, phone, userType, isActive});
		const companyObject = new CompanyProfileModel(companyData);
		return await companyObject.save();
	},

	blockUnblock: async ({ id }: blockUnBlockInterface) => {
		const company = await CompanyProfileModel.findById(id);
		if (!company) {
			throw new Error("Company not found");
		}

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
