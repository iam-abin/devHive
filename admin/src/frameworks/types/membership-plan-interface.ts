export interface MembershipPlanData {
	name: String;
	features: [string];
	description: string;
	price: number;
	isActive?: boolean;
}