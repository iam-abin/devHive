import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { produceMessage } from "../../frameworks/services/kafka/producer";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updateJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const data = req.body;
        const {id} = req.params;
        console.log("in recruiter update job controller 1: ",data, "id: ",id);

        const updatedJob = await updateJobUseCase(dependencies).execute(id, data);
        console.log("in recruiter update job controller 2: ",updatedJob, "id: ",id);

        //  // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
		// await produceMessage(updatedJob, 'JOB_UPDATED_TOPIC')


        res.status(200).json({message: "Job updated successfully", data: updatedJob })
    };

}