import { MembershipPlan } from "../../../entities/membership-plan";
import schemas from "../../database/mongo/models";

const { MembershipPlansModel } = schemas;

export = {
	getAllMembershipPlans: async () => {
		const membershipPlans = await MembershipPlansModel.find({});
		return membershipPlans;
	},

	// Following functions are used by handleMessage when a kafka event comes 
	createMembershipPlan: async (data: any)=>{
		console.log("premium inside create premium ",data);
		const membershipPlanData = new MembershipPlan(data)
		const premium =  MembershipPlansModel.buildMembershipPlan(membershipPlanData);

		return await premium.save();
	},

	getMembershipPlan: async (id: string) => {
		const chatMessages = await MembershipPlansModel.findById(id);
		return chatMessages;
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
