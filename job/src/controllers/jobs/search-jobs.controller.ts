import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getSearchResultUseCase, getSearchResultCountUseCase }} = dependencies 

    return async (req: Request, res: Response)=>{
        
        const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 2;
		const skip = (page - 1) * limit;
        
        const {searchKey} = req.body;
        
        const {searchResult, searchResultCount} = await getSearchResultUseCase(dependencies).execute(searchKey, skip, limit);
        
        res.status(200).json({message: "getSearchResultUseCase are ", data: {searchResult, searchResultCount} })
    };

}