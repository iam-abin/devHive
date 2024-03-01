import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError, RequestValidationError } from "@abijobportal/common";
import { MemberShipPlanCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { createMemberShipPlanUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        console.log("in recruiter create MemberShipPlan controller 1: ",data);

        const membershipPlan = await createMemberShipPlanUseCase(dependencies).execute(data);
        console.log("in admin create MemberShipPlan controller 2: ",membershipPlan);

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