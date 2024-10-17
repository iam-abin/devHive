import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka.connection";
import { JobDeletedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-deleted-publisher";
import { NotAuthorizedError, NotFoundError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { deleteJobUseCase, getJobByIdUseCase, getRecruiterCreatedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id: jobId} = req.params;
        const {userId} = req.currentUser

        const deletedJob = await deleteJobUseCase(dependencies).execute(jobId, userId);

        return res.status(200).json({message: "Job deleted successfully", data: deletedJob })

      
    };

}