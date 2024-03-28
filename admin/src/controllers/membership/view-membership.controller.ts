import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getMemberShipPlanByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {memberShipPlanId} = req.params;
        
        const response = await getMemberShipPlanByIdUseCase(dependencies).execute(memberShipPlanId);
        
        if(response == null) throw new BadRequestError("invalid memberShipPlan memberShipPlanId")
        
        res.status(200).json({message: "memberShipPlan get successfully", data: response })

    };

}