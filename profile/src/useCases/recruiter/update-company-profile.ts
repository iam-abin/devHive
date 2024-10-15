import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		repositories: { companyProfileRepository },
	} = dependencies;

	if (!companyProfileRepository) {
		throw new Error(
			"companyProfileRepository should exist in dependencies"
		);
	}

	const execute = async (id: string, data: any) => {
		const profile = await companyProfileRepository.updateCompanyProfile(id, data);

		// write code to remove some unwanted fields from result
		
		return profile;
	};

	return { execute };
};
