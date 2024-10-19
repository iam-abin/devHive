import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { MemberShipPlanUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";
import { NotFoundError } from "@abijobportal/common";
import { IMembershipPlan } from "../../frameworks/types/membershipPlan";

export = (dependencies: IDependency)=>{

    const { useCases: { updateMemberShipPlanUseCase, getMemberShipPlanByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body as Partial<IMembershipPlan>;
        const { membershipId } = req.params;
        
        
        const updatedMemberShipPlan = await updateMemberShipPlanUseCase(dependencies).execute(membershipId, data);
        
        res.status(200).json({message: "MemberShipPlan updated successfully", data: updatedMemberShipPlan })
    };

}