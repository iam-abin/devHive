// import { Request, Response } from "express";
// import { DependenciesData } from "../../frameworks/types/dependencyInterface";

// export = (dependencies: DependenciesData)=>{

//     const { useCases: { getAllJobApplicationsUseCase }} = dependencies 

//     return async (req: Request, res: Response)=>{
//         const {recruiterId} = req.params;
//         console.log("in  Job Applications controller 1: ",recruiterId);

//         const applications = await getAllJobApplicationsUseCase(dependencies).execute(recruiterId);
//         console.log("in Job Applications controller 2: ",applications);


//         res.status(200).json({message: "Job applications are ", data: applications })
//     };

// }