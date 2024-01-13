import express from "express";
import { currentUserAdminCheck, currentUserCandidateCheck, currentUserRecruiterCheck } from "@abijobportal/common";

// import { adminRouter } from "./admin";
import { candidateRouter } from "./candidate";
import { recruiterRouter } from "./recruiter";
// import { jobRouter } from "./jobs";
import { DependenciesData } from "../../types/dependencyInterface";


export const routes = (dependencies: DependenciesData) => {
	const router = express.Router();

	// const admin = adminRouter(dependencies);
	// const job = jobRouter(dependencies);
	const candidate = candidateRouter(dependencies);
	const recruiter = recruiterRouter(dependencies);

	// router.use("/admin",currentUserAdminCheck, admin); // currentUserAdmin extract current user from jwt, if user is present add it to req.currentUser
	// router.use("/job", job);
	router.use("/candidate",currentUserCandidateCheck, candidate);
	router.use("/recruiter",currentUserRecruiterCheck, recruiter);

	// router.use("/candidate",candidate);
	// router.use("/recruiter",recruiter);

	return router;
};
