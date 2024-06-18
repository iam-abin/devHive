// import { IMembershipPlanData } from "../frameworks/types/membership-plan-interface";
export interface IMembershipPlanData {
	membershipPlanId: string,
	name: String;
	features: string[];
	description: string;
	price: number;
	isActive: boolean;
}

export class MembershipPlan {
	membershipPlanId: string;
	name: String;
	features: string[];
	description: string;
	price: number;
	isActive: boolean;


	constructor({ membershipPlanId, name, features, description, price, isActive }: IMembershipPlanData) {
		this.membershipPlanId = membershipPlanId;
		this.name = name;
		this.features = features;
		this.description = description;
		this.price = price;
		this.isActive = isActive;
	}
}
