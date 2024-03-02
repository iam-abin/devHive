import { MembershipPlanData } from "../frameworks/types/membership-plan-interface";

export class MembershipPlan {
	name: String;
	features: Array<string>;
	description: string;
	price: number;

	constructor({ name, features, description, price }: MembershipPlanData) {
		this.name = name;
		this.features = features;
		this.description = description;
		this.price = price;
	}
}
