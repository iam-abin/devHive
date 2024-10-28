import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { membershipRepository, paymentRepository },
    } = dependencies;

    if (!paymentRepository) throw new Error('paymentRepository should exist in dependencies');

    const execute = async () => {
        // eslint-diable-next-line  @typescript-eslint/no-explicit-any
        const monthlyPayments: any = await paymentRepository.getGraphData();
        const paymentPlans = await membershipRepository.getAllMembershipPlanNames();

        const palmentPlanNamesArray = [];

        if (paymentPlans) {
            for (let i = 0; i < paymentPlans.length; i++) {
                palmentPlanNamesArray.push(paymentPlans[i].name);
            }
        }

        // eslint-diable-next-line  @typescript-eslint/no-explicit-any
        const arrays: any = {};

        // Dynamically create arrays using the elements in the 'names' array as names for those arrays
        palmentPlanNamesArray.forEach((paymentPlan: string) => {
            arrays[paymentPlan] = new Array(12).fill(0);
        });

        // Output: { premium: [], gold: [] }
        for (const payment of monthlyPayments) {
            arrays[payment.planName][payment.month.month - 1] = payment.totalAmount;
        }

        const arr = [];
        for (const plan in arrays) {
            arr.push({
                name: plan,
                data: arrays[plan],
            });
        }

        return arr;
    };

    return { execute };
};
