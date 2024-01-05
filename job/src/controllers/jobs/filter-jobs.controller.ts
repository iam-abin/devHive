import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { filterJobUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        console.log("aaaaaaaaaaaaaaaaaa");
        console.log(req.body);
        console.log("aaaaaaaaaaaaaaaaaa");
        
        const filterData = req.body;
        console.log("in candidate filter job controller 1: ",filterData);

        const newJob = await filterJobUseCase(dependencies).execute(filterData );
        console.log("in candidate filter job controller 2: ",newJob);


        res.status(200).json({message: "Job filtered successfully", data: newJob })
    };

}