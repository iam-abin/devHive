import { RecruiterProfile } from "../../entities";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { RecruiterDataProfile } from "../../frameworks/types/recruiter-profile-interface";

export = (dependencies: IDependency) => {
	const {
		repositories: { recruiterProfileRepository, companyProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	if (!companyProfileRepository) {
		throw new Error(
			"companyProfileRepository should exist in dependencies"
		);
	}

	const execute = async (profileData: RecruiterDataProfile) => {
		const {
			company_name,
			company_location,
			company_state,
			company_country,
			userId,
		} = profileData;

		// dont need these info's when creating recruiter profile
		delete profileData.company_name;
		delete profileData.company_location;
		delete profileData.company_state;
		delete profileData.company_country;

		// const id = profileData.id
		// delete profileData.id
		// profileData.userId = id

		// multiple recruiters can have same company
		// to avoid creating a company again and again, Check if the company exists
		const isCompanyExist = await companyProfileRepository.getCompany({
			company_name,
			company_location,
			company_state,
			company_country,
		});
		
		if (!isCompanyExist) {
			// If the company doesn't exist, create a new company profile
			
			const newCompany =
				await companyProfileRepository.createCompanyProfile({
					company_name,
					company_location,
					company_state,
					company_country,
					userId, // it is not working, need to solve
				});
				
			profileData.company_id = newCompany._id.toString();
		} else {
			// if the company already exists, need to push new recruiter to the company
			isCompanyExist.userId.push(userId); 
			await companyProfileRepository.updateCompanyProfile(isCompanyExist)

			profileData.company_id = isCompanyExist.id;
		}

		const profile = new RecruiterProfile(profileData);

		return await recruiterProfileRepository.createRecruiterProfile(profile);
	};

	return { execute };
};
