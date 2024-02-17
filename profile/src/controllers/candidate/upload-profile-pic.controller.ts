import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadCandidateProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const user = req.currentUserCandidate;
        console.log("----------------------------------------------------------------------",req.currentUserCandidate);
        
        console.log("in candidate upload resume controller data 1: req.file",req.file);
        const candidate = await uploadCandidateProfilePicUseCase(dependencies).execute(user?.id ,req.file);
        console.log("in candidate upload profile pic controller data 2: ",candidate);

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