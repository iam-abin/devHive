export interface IMembershipPlan {
    membershipPlanId: string;
    name: string;
    features: string[];
    description: string;
    price: number;
    isActive: boolean;
}
