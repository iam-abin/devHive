import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { getAdminByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
			const { email, password } = req.body;

            // check admin exist
			const isExistingUser = await getAdminByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("Invalid email or password");
			}

            // check password is correct
            const isSamePassword = password === isExistingUser.password

            if(!isSamePassword){
                // return res.status(400).json({message:"Invalid email or passwordd"})

                throw new BadRequestError("Invalid email or passwordd");
            }

			// Generate Jwt
            const adminPayloadData = {
				id: isExistingUser.id,
				email: isExistingUser.email,
				userType: isExistingUser.userType,
			};
			
            // Generate Jwt key
			const adminJWT = createJwtToken(adminPayloadData);

            // Store it on session object
            // req.session = {jwt: candidateJwt};

            // Store it on cookie
            res.cookie('adminToken', adminJWT, { httpOnly: true })

            res.status(200).json({message: "Login successfull", data: isExistingUser});
	};
};
