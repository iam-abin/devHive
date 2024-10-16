import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { BadRequestError } from "@abijobportal/common";

export = (dependencies: IDependency)=>{

    const { useCases: { getMemberShipPlanByIdUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {memberShipPlanId} = req.params;
        
        const response = await getMemberShipPlanByIdUseCase(dependencies).execute(memberShipPlanId);
        
        res.status(200).json({message: "memberShipPlan get successfully", data: response })

    };

}