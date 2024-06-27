import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { uploadCandidateProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const user = req.currentUserCandidate; 
        const candidate = await uploadCandidateProfilePicUseCase(dependencies).execute(user?.id ,req.file);
        
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
            userId: candidate?._id,
        })
        
        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}