// import { Request, Response } from "express";
// import { DependenciesData } from "../../frameworks/types/dependencyInterface";
// import { BadRequestError } from "@abijobportal/common";
// import { kafkaClient } from "../../config/kafka-connection";
// import { CompanyProfileCreatedEventPublisher } from "../../frameworks/services/kafka-events/publishers/company-profile-created-publisher";

// export = (dependencies: DependenciesData)=>{

//     const { useCases: { getRecruiterProfileByEmailUseCase ,createRecruiterProfileUseCase }} = dependencies

//     return async (req: Request, res: Response)=>{
//         const data = req.body;
//         console.log("in recruiter create profile controller data: ",data);
//         const { email } = req.body
//         const profile = await getRecruiterProfileByEmailUseCase(dependencies).execute(email);
//         if(profile){
//             throw new BadRequestError("profile already exist")
//         }
        

//         // company and recruiter profile creation are done in 'createRecruiterProfileUseCase'  
//         const recruiter = await createRecruiterProfileUseCase(dependencies).execute(data);
//         console.log("in recruiter create profile controller recruiter: ",recruiter);

//         // publish message after creating company
//         const companyProfileCreatedEvent = new CompanyProfileCreatedEventPublisher(kafkaClient);
//         await companyProfileCreatedEvent.publish({
//             company_name: data.company_name,
//             company_location: data.company_location,
//             isActive: data.isActive,
//             company_state: data.company_state,
//             company_country: data.company_country
//         })

//         res.status(200).json({message: "recruiter data", data: recruiter })
//     };

// }