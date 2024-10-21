export interface IMembershipPlan {
	membershipPlanId: string,
	name: String;
	features: string[];
	description: string;
	price: number;
	isActive: boolean;
}
