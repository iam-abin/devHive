import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { RecruiterProfileUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/recruiter-profile-updated-publisher";
import { CompanyProfileCreatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/company-profile-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: {  getRecruiterProfileByIdUseCase ,updateRecruiterProfileUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        console.log("in recruiter update profile controller data: ",updatedData);
        const { id } = req.body
        const existingData = await getRecruiterProfileByIdUseCase(dependencies).execute(id);
        

        const recruiter = await updateRecruiterProfileUseCase(dependencies).execute(existingData, updatedData);
        console.log("in recruiter update profile controller recruiter: ",recruiter);

        const recruiterProfileUpdatedEvent = new RecruiterProfileUpdatedEventPublisher(kafkaClient)
        await recruiterProfileUpdatedEvent.publish({
            name: updatedData?.name,
            email: updatedData?.email,
            phone: updatedData?.phone,
            isActive: updatedData?.isActive,
            gender: updatedData?.gender,
            profile_image: updatedData?.profile_image,
            about: updatedData?.about,
            company_id: updatedData?.company_id,
            userId: updatedData?.userId,
        })



        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}