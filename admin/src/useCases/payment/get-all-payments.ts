import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories:{paymentRepository} } = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = () => {
		return paymentRepository.getAllPayments();
	};

	return { execute };
};
