import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";
import jwt from "jsonwebtoken";

export = (dependencies: any) => {
	const {
		useCases: { getCandidateByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const isExistingUser = await getCandidateByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
				throw new BadRequestError("Invalid email or password");
			}

			// generate jwt ket
			const candidateJwt = jwt.sign(
				{
					id: isExistingUser.id,
					email: isExistingUser.email,
					userType: isExistingUser.userType,
				},
				"adfkhk" // key // refer youtube
			);

            // Store it on session object
            req.session = {jwt: candidateJwt};

            res.status(200).json({message: "Login successful", data: isExistingUser})
		} catch (error) {
			console.log(error);
		}
	};
};
