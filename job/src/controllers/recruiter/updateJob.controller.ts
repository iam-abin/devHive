import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { JobUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-updated-publisher";
import { kafkaClient } from "../../config/kafka-connection";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "@abijobportal/common";
import { IJob } from "../../frameworks/types/job";

export = (dependencies: IDependency)=>{

    const { useCases: { updateJobUseCase, getJobByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body as Partial<IJob>;
        // const {jobId} = data;
        const { jobId } = req.params;
        
        
        const updatedJob = await updateJobUseCase(dependencies).execute(jobId, data);
       

        res.status(200).json({message: "Job updated successfully", data: updatedJob })
    };

}