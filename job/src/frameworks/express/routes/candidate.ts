import express from "express";

import { auth, checkCurrentUser, ROLES } from "@abijobportal/common";
import { jobsControllers, candidateJobControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jobsController = jobsControllers(dependencies);
    const candidateJobController = candidateJobControllers(dependencies);

    // This route is to get all jobs. It's a post req because i am passing some data to server.
    router.get(
        "/all-jobs/:page",
        checkCurrentUser,
        jobsController.viewAllJobsController
    );

    router.post(
        "/all-job-fields-distinct-values",
        jobsController.viewAllJobFieldsDistinctValuesController
    );

    router.get("/:id", jobsController.viewJobByJobIdController);

    router.post("/filter", jobsController.filterJobsController);

    router.post("/search/:page", jobsController.searchJobsController);

    router.use(checkCurrentUser);
    router.use(auth(ROLES.CANDIDATE));

    router.post("/apply/:jobId", candidateJobController.applyJobController);

    router.get(
        "/applied/:candidateId/:page",
        candidateJobController.appliedJobsController
    );

    router.get(
        "/application/:jobApplicationId",
        candidateJobController.viewPliedJobApplicationController
    );

    return router;
};
