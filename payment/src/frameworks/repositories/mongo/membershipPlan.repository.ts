import { MembershipPlan } from "../../../entities/membershipPlan";
import Models from "../../database/mongo/models";
import { IMembershipPlanDocument } from "../../database/mongo/models/membershipPlan";
import { IMembershipPlan } from "../../types/membershipPlan";

const { MembershipPlanModel } = Models;

export = {
	getAllMembershipPlans: async (): Promise<IMembershipPlanDocument[] | []> => {
		const membershipPlans = await MembershipPlanModel.find({});
		return membershipPlans;
	},

	// Following functions are used by handleMessage when a kafka event comes 
	createMembershipPlan: async (data: IMembershipPlan): Promise<IMembershipPlanDocument | null>=>{
		
		const membershipPlanData = new MembershipPlan(data)
		const premium =  MembershipPlanModel.buildMembershipPlan(membershipPlanData);

		return await premium.save();
	},

	getMembershipPlan: async (id: string): Promise<IMembershipPlanDocument | null> => {
		const chatMessages = await MembershipPlanModel.findById(id);
		return chatMessages;
	},


	updateMembershipPlan: async (planId: string, data: IMembershipPlan): Promise<IMembershipPlanDocument | null> => {
		const updatedJob = await MembershipPlanModel.findByIdAndUpdate(
			planId ,
			{ $set: data },
			{ new: true }
		);
		return updatedJob;
	},

};
