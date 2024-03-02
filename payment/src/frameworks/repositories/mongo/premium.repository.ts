import schemas from "../../database/mongo/models";

const { MembershipPlansModel } = schemas;

export = {

	createMembershipPlan: async (data: any)=>{
		console.log("premium inside create premium ",data);
		const premium =  MembershipPlansModel.buildMembershipPlan(data);

		console.log("premium inside create premium ",premium);
		return await premium.save();
	},

	getMembershipPlan: async (id: string) => {
		const chatMessages = await MembershipPlansModel.findById(id);
		return chatMessages;
	},

	getAllMembershipPlans: async () => {
		const membershipPlans = await MembershipPlansModel.find({});
		return membershipPlans;
	},

	updateMembershipPlan: async (id: string, status: object) => {
		const updatedJob = await MembershipPlansModel.findOneAndUpdate(
			{ _id: id },
			{ $set: status },
			{ new: true }
		);
		return updatedJob;
	},

};
