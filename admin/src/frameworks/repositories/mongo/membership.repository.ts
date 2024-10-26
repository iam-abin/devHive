import { IMembershipPlanData } from "../../../entities/membership-plan";
import {
    IMembershipPlansDocument,
    MembershipPlansModel,
} from "../../database/models";

export = {
    createMembershipPlan: async (
        membershipPlanData: IMembershipPlanData
    ): Promise<IMembershipPlansDocument> => {
        const membershipPlanObject =
            MembershipPlansModel.buildMembershipPlan(membershipPlanData);
        return await membershipPlanObject.save();
    },

    blockUnblock: async (
        membershipPlanId: string
    ): Promise<IMembershipPlansDocument> => {
        const membershipPlan = await MembershipPlansModel.findById(
            membershipPlanId
        );
        if (!membershipPlan) throw new Error("membershipPlan not found");

        membershipPlan.isActive = !membershipPlan.isActive;

        return await membershipPlan.save();
    },

    updateMembershipPlan: async (
        membershipPlanId: string,
        data: Partial<IMembershipPlanData>
    ): Promise<IMembershipPlansDocument | null> => {
        const updatedMembershipPlan =
            await MembershipPlansModel.findByIdAndUpdate(
                membershipPlanId,
                { $set: data },
                { new: true }
            );
        return updatedMembershipPlan;
    },

    getAllMembershipPlanNames: async () => {
        const membershipPlansName = await MembershipPlansModel.aggregate([
            {
                $group: { _id: "$name" },
            },
            {
                $project: { name: "$_id", _id: 0 },
            },
        ]);
        return membershipPlansName;
    },

    getById: async (
        membershipPlanId: string
    ): Promise<IMembershipPlansDocument | null> => {
        const membershipPlan = await MembershipPlansModel.findById(
            membershipPlanId
        );
        return membershipPlan;
    },

    getByName: async (
        membershipPlanName: string
    ): Promise<IMembershipPlansDocument | null> => {
        const membershipPlan = await MembershipPlansModel.findOne({
            name: membershipPlanName,
        });
        return membershipPlan;
    },

    getAllMembershipPlans: async (
        skip: number,
        limit: number
    ): Promise<IMembershipPlansDocument[] | []> => {
        const membershipPlans = await MembershipPlansModel.find({})
            .skip(skip)
            .limit(limit)
            .select(["name", "price"]);
        return membershipPlans;
    },

    getCountOfMembershipPlans: async (): Promise<number> => {
        return await MembershipPlansModel.countDocuments();
    },
};
