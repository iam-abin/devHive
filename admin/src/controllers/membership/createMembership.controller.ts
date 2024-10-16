import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { BadRequestError, RequestValidationError } from "@abijobportal/common";
import { MemberShipPlanCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-created-publisher";
import { kafkaClient } from "../../config/kafka.connection";
import { IMembershipPlan } from "../../frameworks/types/membership-plan-interface";

export = (dependencies: IDependency)=>{

    const { useCases: { createMemberShipPlanUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body as IMembershipPlan;
        
        const membershipPlan = await createMemberShipPlanUseCase(dependencies).execute(data);
        
        res.status(201).json({message: "MemberShipPlan created successfully", data: membershipPlan })
    };

}