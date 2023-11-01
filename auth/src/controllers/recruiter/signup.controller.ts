import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { createJwtToken } from "../../frameworks/services/jwtToken";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { recruiterSignupUseCase, getRecruiterByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		try {
			const { name, email, phone, password } = req.body;
			// const userData = req.body;

			const isExistingUser = await getRecruiterByEmailUseCase(
				dependencies
			).execute(email);

			if (isExistingUser) {
                // return res.status(400).json({message:"Email already exist"})
				throw new BadRequestError("Email already exist");
			}

			// userData.password = await  // password hashing can be done in schema or model
			const newUser = await recruiterSignupUseCase(dependencies).execute({
				name,
				email,
				phone,
				password,
				userType: "recruiter",
			});

			if (!newUser) {
				console.log("register error");
			}

			const recruiterPayloadData = {
				id: newUser.id,
				email: newUser.email,
				userType: newUser.userType,
			};

			// Generate Jwt key
			const recruiterJWT = createJwtToken(recruiterPayloadData);

			// Store it on session object
			// req.session = {
			// 	jwt: recruiterJWT,
			// };

            // Store it on cookie
			res.cookie("recruiterToken", recruiterJWT, { httpOnly: true });
			res.status(201).json({
				message: "user is register successfully",
				data: newUser,
			});
		} catch (error) {
			console.log(error);
		}
	};
};
