export interface IMembershipPlanData {
    name: string;
    features: Array<string>;
    description: string;
    price: number;
    isActive?: boolean;
}

export class MembershipPlan {
    name: string;
    features: Array<string>;
    description: string;
    price: number;

    constructor({ name, features, description, price }: IMembershipPlanData) {
        this.name = name;
        this.features = features;
        this.description = description;
        this.price = price;
    }
}
