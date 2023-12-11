import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { CompanyProfileUpdatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/company-profile-update-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: DependenciesData)=>{

    const { useCases: {  getCompanyProfileByRecruiterUseCase ,updateCompanyProfileByRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const updatedData = req.body;
        console.log("in recruiter update profile controller data: ",updatedData);
        const { id } = req.body
        const existingData = await getCompanyProfileByRecruiterUseCase(dependencies).execute(id);
        

        const recruiter = await updateCompanyProfileByRecruiterUseCase(dependencies).execute(existingData, updatedData);
        console.log("in recruiter update profile controller recruiter: ",recruiter);

        const companyProfileUpdatedEvent = new CompanyProfileUpdatedEventPublisher(kafkaClient);
        await companyProfileUpdatedEvent.publish({
            company_name: updatedData?.company_name,
            company_location: updatedData?.company_location,
            email: updatedData?.email,
            isActive: updatedData?.isActive,
            logo: updatedData?.logo,
            website: updatedData?.website,
            company_state: updatedData?.company_state,
            company_country: updatedData?.company_country,
            description: updatedData?.description,
            recruiters: updatedData?.recruiters,
        })

        res.status(200).json({message: "recruiter data", data: recruiter })
    };

}