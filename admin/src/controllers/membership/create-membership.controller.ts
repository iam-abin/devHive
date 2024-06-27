import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError, RequestValidationError } from "@abijobportal/common";
import { MemberShipPlanCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { createMemberShipPlanUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        
        const membershipPlan = await createMemberShipPlanUseCase(dependencies).execute(data);
        // // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed

        const memberShipPlanCreatedEvent = new MemberShipPlanCreatedEventPublisher(kafkaClient);
        await memberShipPlanCreatedEvent.publish({
            membershipPlanId: membershipPlan.id,
            name : membershipPlan?.name,
            features : membershipPlan?.features,
            description : membershipPlan?.description,
            price : membershipPlan?.price,
            isActive : membershipPlan?.isActive,
        });


        res.status(201).json({message: "MemberShipPlan created successfully", data: membershipPlan })
    };

}