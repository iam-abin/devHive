export = (dependencies: any) => {
	const {
		repositories: { membershipRepository, paymentRepository },
	} = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = async () => {
		const monthlyPayments: any = await paymentRepository.getGraphData();
		const paymentPlans =
			await membershipRepository.getAllMembershipPlanNames();
			
			// const palmentPlanNamesSet = new Set();
			let palmentPlanNamesArray =[]
		
			if (paymentPlans) {
				for (let i = 0; i < paymentPlans.length; i++) {
					// palmentPlanNamesSet.add(paymentPlans[i].name);
					palmentPlanNamesArray.push(paymentPlans[i].name);
					
					
				}
			}
		const arrays: any = {};

		// Dynamically create arrays using the elements in the 'names' array as names for those arrays
		palmentPlanNamesArray.forEach((paymentPlan: string) => {
			arrays[paymentPlan] = new Array(12).fill(0);
		});
		console.log(arrays); // Output: { premium: [], gold: [] }
		
		for(let payment of monthlyPayments){
			arrays[payment.planName][payment.month.month-1] = payment.totalAmount
		}

		console.log(
			"inside get dashboard graph details usecase ",
			monthlyPayments
		);
		console.log(
			"inside get dashboard graph details paymentPlans usecase array of Objects ",
			arrays
		);

		  
		let arr = [];
		for(let plan in arrays){
		  arr.push({
			name: plan,
			data: arrays[plan]
		  })
		}

		return arr;
	};

	return { execute };
};
