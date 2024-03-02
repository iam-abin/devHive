import schemas from "../../database/mongo/models";

const { MembershipPlansModel } = schemas;

export = {
	
	createMembershipPlan: async (membershipPlanData: any): Promise<any> => {
		console.log(
			"inside createMembershipPlan fn in admin service",
			membershipPlanData
		);

		const membershipPlanObject =
			MembershipPlansModel.buildMembershipPlan(membershipPlanData);
		return await membershipPlanObject.save();
	},
};
