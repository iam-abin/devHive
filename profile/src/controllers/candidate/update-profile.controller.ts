import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByUserIdUseCase, updateCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        console.log("in candidate update profile controller data: ",updatedData);
        const { userId } = req.body
        const existingData = await getCandidateProfileByUserIdUseCase(dependencies).execute(userId);
        
console.log("existing data", existingData);

        const candidate = await updateCandidateProfileUseCase(dependencies).execute(existingData,updatedData);
        console.log("in canidiare update profile controller candidate: ",candidate);

        const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient)
        await candidateProfileUpdatedEvent.publish({
            name: updatedData?.name,
            email: updatedData?.email,
            phone: updatedData?.phone,
            isActive: updatedData?.isActive,
            gender: updatedData?.gender,
            currentLocation: updatedData?.currentLocation,
            address: updatedData?.address,
            keySkills: updatedData?.keySkills,
            profile_image: updatedData?.profile_image,
            about: updatedData?.about,
            resume: updatedData?.resume,
            experience: updatedData?.experience,
            userId: updatedData?.userId,
        })

        await new UserUpdatedEventPublisher(kafkaClient).publish({
            name: updatedData?.name,
            email: updatedData?.email,
            phone: updatedData?.phone,
            isActive: updatedData?.isActive,
            userType: "candidate",
            userId: updatedData?.userId,
        })

        res.status(200).json({message: "candidate data after update", data: candidate })
    };

}