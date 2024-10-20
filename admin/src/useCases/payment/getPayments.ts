import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{paymentRepository} } = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = async() => {
		return await paymentRepository.getAllPayments();
	};

	return { execute };
};
