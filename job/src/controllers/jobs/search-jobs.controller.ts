import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getSearchResultUseCase, getSearchResultCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        console.log("in search job controller 1: ");
		console.log("req.params.page ",req.params.page);

        const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 4;
		const skip = (page - 1) * limit;
        
        // const {jobApplicationId} = req.params;
        const {searchKey} = req.body;
        console.log("in  view a Job Application controller 1: ",searchKey);

        const searchResult = await getSearchResultUseCase(dependencies).execute(searchKey, skip, limit);
        const searchResultCount = await getSearchResultCountUseCase(dependencies).execute(searchKey);
        console.log("in view a getSearchResultUseCase controller 2: ",searchResult);
        console.log("in view a searchResultCount controller 2: ",searchResultCount);


        res.status(200).json({message: "getSearchResultUseCase are ", data: {searchResult, searchResultCount} })
    };

}