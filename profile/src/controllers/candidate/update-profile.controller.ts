import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { kafkaClient } from "../../config/kafka-connection";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/candidate-profile-updated-publisher ";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getCandidateProfileByCandidateIdUseCase, updateCandidateProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        console.log("in candidate update profile controller data: ",updatedData);
        const { candidateId } = req.body
        const existingData = await getCandidateProfileByCandidateIdUseCase(dependencies).execute(candidateId);
        

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
            candidateId: updatedData?.candidateId,
        })

        res.status(200).json({message: "candidate data after update", data: candidate })
    };

}