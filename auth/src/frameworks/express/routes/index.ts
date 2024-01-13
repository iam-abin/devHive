import express from "express";
import { currentUserAdminCheck, currentUserRecruiterCheck } from "@abijobportal/common";
import { currentUserCandidateCheck } from "@abijobportal/common";

import { adminRouter } from "./admin";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
import { otpRouter } from "./otp"; 
import { jwtRouter } from "./jwt-refresh";
import { DependenciesData } from "../../types/dependencyInterface";

export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	const admin = adminRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);
	const otp = otpRouter(dependencies)
	const jwtRefresh  = jwtRouter(dependencies)

	router.use("/admin",currentUserAdminCheck, admin); // currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	router.use("/candidate",currentUserCandidateCheck, candidate);
	router.use("/recruiter",currentUserRecruiterCheck, recruiter);
	router.use("/otp", otp) // forgot password nodemailer otps
	router.use("/jwt-refresh", jwtRefresh);

	return router;
};
