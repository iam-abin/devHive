import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: { uploadProfilePicUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId, profile_image} = req.body;
        console.log("in candidate upload profile pic controller data 1: ",profile_image);
        

        const candidate = await uploadProfilePicUseCase(dependencies).execute({
           userId, profile_image
        });
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
            userId: candidate?.userId,
        })



        res.status(201).json({message: "profile image uploaded", data: candidate })
    };

}