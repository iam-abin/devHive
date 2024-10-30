import { IDependency } from '../../frameworks/types/dependency';

interface IGraphData {
    name: string;
    data: number[];
}

interface IPaymentData {
    [paymentPlan: string]: number[];
}

export = (dependencies: IDependency) => {
    const {
        repositories: { membershipRepository, paymentRepository },
    } = dependencies;

    if (!paymentRepository) throw new Error('paymentRepository should exist in dependencies');

    const execute = async () => {
        const monthlyPayments = await paymentRepository.getGraphData();
        const paymentPlans = await membershipRepository.getAllMembershipPlanNames();

        const paymentPlanNamesArray: string[] = [];

        if (paymentPlans) {
            for (let i = 0; i < paymentPlans.length; i++) {
                paymentPlanNamesArray.push(paymentPlans[i].name);
            }
        }

        const paymentData: IPaymentData = {};

        // Dynamically create paymentData using the elements in the 'names' array as names for those paymentData
        paymentPlanNamesArray.forEach((paymentPlan: string) => {
            paymentData[paymentPlan] = new Array(12).fill(0);
        });

        for (const payment of monthlyPayments) {
            paymentData[payment.planName][payment.month.month - 1] = payment.totalAmount;
        }

        const paymentGraphData: IGraphData[] = [];
        for (const plan in paymentData) {
            paymentGraphData.push({
                name: plan,
                data: paymentData[plan],
            });
        }
        return paymentGraphData;
    };

    return { execute };
};
