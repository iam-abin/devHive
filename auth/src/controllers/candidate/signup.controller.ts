import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";
// import { candidateSignupUseCase } from "../../useCases";

export = (dependencies: any)=>{
    const {useCases:{candidateSignupUseCase, getCandidateByEmailUseCase}} = dependencies;

    return async (req: Request, res: Response)=>{
        try {
            const { name, email, phone, password } = req.body;
            // const userData = req.body;

            const isExistingUser = await getCandidateByEmailUseCase(dependencies).execute(email);

            if(isExistingUser){
                throw new BadRequestError("Email already exist");
            }

            // userData.password = await  // password hashing can be done in schema or model
            const newUser = await candidateSignupUseCase(dependencies).execute({ name, email, phone, password, userType:"candidate" });
            if (!newUser) {
                console.log("register error");
            }

            res.status(201).json({
                message: "user is register successfully",
                data: newUser
            })

            
        } catch (error) {
            console.log(error);
            
        }
    }
}