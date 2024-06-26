import Models from "../../database/models";

const { MembershipPlansModel } = Models;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	createMembershipPlan: async (membershipPlanData: any): Promise<any> => {
		const membershipPlanObject =
			MembershipPlansModel.buildMembershipPlan(membershipPlanData);
		return await membershipPlanObject.save();
	},

	blockUnblock: async (membershipPlanId: string) => {
		const membershipPlan = await MembershipPlansModel.findById(
			membershipPlanId
		);
		if (!membershipPlan) throw new Error("membershipPlan not found");

		membershipPlan.isActive = !membershipPlan.isActive;

		return await membershipPlan.save();
	},

	updateMembershipPlan: async (membershipPlanId: string, data: object) => {
		const updatedMembershipPlan =
			await MembershipPlansModel.findOneAndUpdate(
				{ _id: membershipPlanId },
				{ $set: data },
				{ new: true }
			);
		return updatedMembershipPlan;
	},

	getAllMembershipPlanNames:  async () => {
		const membershipPlansName = await MembershipPlansModel.aggregate([
			{
				$group: { _id: "$name" }
			},
			{
				$project: { name: "$_id", _id: 0 }
			}
		]);
		return membershipPlansName;
	},

	getById: async (membershipPlanId: string) => {
		const membershipPlan = await MembershipPlansModel.findById(
			membershipPlanId
		);
		return membershipPlan;
	},

	getAllMembershipPlans: async () => {
		const membershipPlans = await MembershipPlansModel.find({});
		return membershipPlans;
	},
};

// export default repository();
