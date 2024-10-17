import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { BadRequestError, RequestValidationError } from "@abijobportal/common";
import { JobCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";
import { IJob } from "../../frameworks/types/job";

export = (dependencies: IDependency)=>{

    const { useCases: { createJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser

        const data = req.body as IJob;
        
        
        const newJob = await createJobUseCase(dependencies).execute(userId, data);


        res.status(201).json({message: "Job created successfully", data: newJob })
    };

}