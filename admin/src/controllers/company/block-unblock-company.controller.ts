import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { JobUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-updated-publisher";
import { CompanyProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/company-profile-updated-publisher";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { blockUnblockCompanyUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id} = req.params;
        

        const isBlocked = await blockUnblockCompanyUseCase(dependencies).execute({
            id
        });
        
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const companyProfileUpdatedEvent = new CompanyProfileUpdatedEventPublisher(kafkaClient)
		await companyProfileUpdatedEvent.publish(isBlocked)
        

        res.status(200).json({message: `company ${isBlocked.isActive ? "unBlocked" : "Blocked"}  successfully`, data: isBlocked})
    };

}