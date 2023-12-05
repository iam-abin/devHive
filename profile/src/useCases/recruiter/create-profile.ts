import { RecruiterProfile } from "../../entities";
import { RecruiterDataProfile } from "../../frameworks/types/recruiter-profile-interface";

export  = (dependencies: any) => {
	const { repositories: { recruiterProfileRepository, companyProfileRepository } } = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error("recruiterProfileRepository should exist in dependencies");
	}

	if (!companyProfileRepository) {
		throw new Error("companyProfileRepository should exist in dependencies");
	}

	const execute = async (profileData: RecruiterDataProfile) => {
		const profile = new RecruiterProfile(profileData);
		const { company_name, company_location, company_state, company_country } = profile;

		// multiple recruiters can have same company
		// to avoid creating a company again and again, Check if the company exists
		const isCompanyExist = await companyProfileRepository.getCompany({
			company_name,
			company_location,
			company_state,
			company_country,
		});

		console.log("isCompanyExist ", isCompanyExist);

		if (!isCompanyExist) {
			// If the company doesn't exist, create a new company profile
			
			await companyProfileRepository.createCompanyProfile({
				company_name,
				company_location,
				company_state,
				company_country,
			});
		}
		
		return await recruiterProfileRepository.createRecruiterProfile(profile);
	};

	return { execute };
};
