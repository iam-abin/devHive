import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories:{paymentRepository} } = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = () => {
		return paymentRepository.getAllPayments();
	};

	return { execute };
};
