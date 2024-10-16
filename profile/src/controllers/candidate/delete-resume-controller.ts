import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency)=>{

    const { useCases: { deleteResumeUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const user = req.currentUser;
        const {userId} = req.params;
        const candidate = await deleteResumeUseCase(dependencies).execute(userId);
        
        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
        await candidateProfileUpdatedEvent.publish({
            name: candidate?.name,
            email: candidate?.email,
            phone: candidate?.phone,
            isActive: candidate?.isActive,
            gender: candidate?.gender,
            currentLocation: candidate?.currentLocation,
            address: candidate?.address,
            skills: candidate?.skills,
            profile_image: candidate?.profile_image,
            about: candidate?.about,
            resume: candidate?.resume,
            experience: candidate?.experience,
            userId: candidate?.userId,
        })
        
        res.status(201).json({message: "resume deleted", data: candidate })
    };

}