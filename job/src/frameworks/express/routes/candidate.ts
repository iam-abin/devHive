import express from "express";
import { auth, ROLES } from "@abijobportal/common";

import { jobsControllers, candidateJobControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jobsController = jobsControllers(dependencies);
    const candidateJobController = candidateJobControllers(dependencies);

    router.get("/all-jobs/:page", jobsController.viewAllJobsController);

    router.post(
        "/all-job-fields-distinct-values",
        jobsController.viewAllJobFieldsDistinctValuesController
    );

    router.get(
        "/:id",
        auth(ROLES.CANDIDATE),
        jobsController.viewJobByJobIdController
    );

    router.post("/filter", jobsController.filterJobsController);

    router.post("/search/:page", jobsController.searchJobsController);

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
