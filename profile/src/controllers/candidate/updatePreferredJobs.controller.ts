import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { updatePreferredJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {id, preferredJobs} = req.body;
        const {userId} = req.currentUser
        
        const candidate = await updatePreferredJobsUseCase(dependencies).execute(userId, preferredJobs);
        
        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
        await candidateProfileUpdatedEvent.publish({
            userId,
            name: candidate?.name,
            email: candidate?.email,
            phone: candidate?.phone,
            isActive: candidate?.isActive,
            gender: candidate?.gender,
            currentLocation: candidate?.currentLocation,
            address: candidate?.address,
            skills: candidate?.skills,
            profileImage: candidate?.profileImage,
            about: candidate?.about,
            resume: candidate?.resume,
            experience: candidate?.experience,
            preferredJobs: candidate?.preferredJobs,
        })

        res.status(201).json({message: "skills updated", data: candidate })
    };

}