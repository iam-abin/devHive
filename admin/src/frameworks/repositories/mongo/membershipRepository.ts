import schemas from "../../database/models";

const { MembershipPlansModel } = schemas;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	createMembershipPlan: async (membershipPlanData: any): Promise<any> => {
		console.log(
			"inside createMembershipPlan fn in admin service",
			membershipPlanData
		);

		const membershipPlanObject =
			MembershipPlansModel.buildMembershipPlan(membershipPlanData);
		return await membershipPlanObject.save();
	},

	blockUnblock: async (membershipPlanId: string) => {
		const membershipPlan = await MembershipPlansModel.findById(
			membershipPlanId
		);
		if (!membershipPlan) {
			throw new Error("membershipPlan not found");
		}

		membershipPlan.isActive = !membershipPlan.isActive;

		return await membershipPlan.save();
	},

	updateMembershipPlan: async (membershipPlanId: string, data: object) => {
		console.log(
			"in updateMembershipPlan repository membershipPlanId",
			membershipPlanId,
			" data ",
			data
		);

		const updatedMembershipPlan =
			await MembershipPlansModel.findOneAndUpdate(
				{ _id: membershipPlanId },
				{ $set: data },
				{ new: true }
			);
		console.log(
			"in updateMembershipPlan repository after update",
			updatedMembershipPlan
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
