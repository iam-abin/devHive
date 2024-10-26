import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{paymentRepository} } = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = async(page: number, limit: number) => {

		// pagination
        const skip = (page - 1) * limit;
		
		const payments =await paymentRepository.getAllPayments(skip, limit);
		const paymentsCount = await paymentRepository.getCountOfPayments();
		
        const numberOfPages = Math.ceil(paymentsCount / limit);
		return { payments ,numberOfPages }
	};

	return { execute };
};
