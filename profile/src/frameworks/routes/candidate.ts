import express from "express"

import { candidateControllers } from "../../controllers";
import { DependenciesData } from "../types/dependencyInterface"

const candidateRouter = (dependencies: DependenciesData)=>{
    const router = express.Router();

    // const {} = candidateControllers(dependencies);

    // candidate authentication
	// router.use(requireAuthCandidate)

	// candidate
	router.get("/viewProfile", getCandidateByIdController);

    return router
}