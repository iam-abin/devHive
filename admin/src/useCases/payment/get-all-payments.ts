export = (dependencies: any) => {
	const { repositories:{paymentRepository} } = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = () => {
		return paymentRepository.getAllPayments();
	};

	return { execute };
};
