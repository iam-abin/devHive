import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { MemberShipPlanUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-updated-publisher ";
import { kafkaClient } from "../../config/kafka-connection";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { updateMemberShipPlanUseCase, getMemberShipPlanByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        const {membershipId} = data;
        
        const MemberShipPlan = await getMemberShipPlanByIdUseCase(dependencies).execute(membershipId);
        if(!MemberShipPlan) throw new NotFoundError()

        const updatedMemberShipPlan = await updateMemberShipPlanUseCase(dependencies).execute(membershipId, data);
        
        //  // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
		// await produceMessage(updatedMemberShipPlan, 'MEMBERSHIP_PLAN_UPDATED_TOPIC')
        const memberShipPlanUpdatedEvent = new MemberShipPlanUpdatedEventPublisher(kafkaClient);
        await memberShipPlanUpdatedEvent.publish({
            membershipPlanId: updatedMemberShipPlan.id,
            name : updatedMemberShipPlan?.name,
            features : updatedMemberShipPlan?.features,
            description : updatedMemberShipPlan?.description,
            price : updatedMemberShipPlan?.price,
            isActive : updatedMemberShipPlan?.isActive,
        });


        res.status(200).json({message: "MemberShipPlan updated successfully", data: updatedMemberShipPlan })
    };

}