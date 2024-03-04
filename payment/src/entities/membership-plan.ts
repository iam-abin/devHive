// import { MembershipPlanData } from "../frameworks/types/membership-plan-interface";
export interface MembershipPlanData {
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


	constructor({ membershipPlanId, name, features, description, price, isActive }: MembershipPlanData) {
		this.membershipPlanId = membershipPlanId;
		this.name = name;
		this.features = features;
		this.description = description;
		this.price = price;
		this.isActive = isActive;
	}
}
