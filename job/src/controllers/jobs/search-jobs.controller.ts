import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getSearchResultUseCase, getSearchResultCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        
        const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 4;
		const skip = (page - 1) * limit;
        
        // const {jobApplicationId} = req.params;
        const {searchKey} = req.body;
        
        const searchResult = await getSearchResultUseCase(dependencies).execute(searchKey, skip, limit);
        const searchResultCount = await getSearchResultCountUseCase(dependencies).execute(searchKey);
        
        res.status(200).json({message: "getSearchResultUseCase are ", data: {searchResult, searchResultCount} })
    };

}