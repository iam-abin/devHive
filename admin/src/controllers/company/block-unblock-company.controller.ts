import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { JobUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/job-updated-publisher";
import { CompanyProfileUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/company-profile-updated-publisher";

export = (dependencies: DependenciesData)=>{

    const { useCases: { blockUnblockCompanyUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const isBlocked = await blockUnblockCompanyUseCase(dependencies).execute({
            id
        });

        console.log("in bock unblock controller before message send to kafka", isBlocked);
        
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const companyProfileUpdatedEvent = new CompanyProfileUpdatedEventPublisher(kafkaClient)
		await companyProfileUpdatedEvent.publish(isBlocked)
        

        res.status(200).json({message: `company ${isBlocked.isActive ? "unBlocked" : "Blocked"}  successfully`, data: isBlocked})
    };

}