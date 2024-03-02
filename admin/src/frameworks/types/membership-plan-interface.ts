export interface MembershipPlanData {
	name: String;
	features: Array<string>;
	description: string;
	price: number;
	isActive?: boolean;
}