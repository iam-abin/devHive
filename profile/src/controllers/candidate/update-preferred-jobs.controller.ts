import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { updatePreferredJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id, preferredJobs} = req.body;
        console.log("--------in candidate PreferredJobs controller 1-------------------------------------",id);
        console.log("--------in candidate PreferredJobs controller 1------------------------------------",preferredJobs);
        

        const candidate = await updatePreferredJobsUseCase(dependencies).execute(id, preferredJobs);
        console.log("in candidate PreferredJobs controller 2: ",candidate);

        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
        await candidateProfileUpdatedEvent.publish({
            name: candidate?.name,
            email: candidate?.email,
            phone: candidate?.phone,
            isActive: candidate?.isActive,
            gender: candidate?.gender,
            currentLocation: candidate?.currentLocation,
            address: candidate?.address,
            keySkills: candidate?.keySkills,
            profile_image: candidate?.profile_image,
            about: candidate?.about,
            resume: candidate?.resume,
            experience: candidate?.experience,
            preferredJobs: candidate?.preferredJobs,
            userId: id,
        })

        
        res.status(201).json({message: "skills updated", data: candidate })
    };

}