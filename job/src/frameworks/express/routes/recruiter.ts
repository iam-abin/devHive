import express from "express";

import { auth, ROLES } from "@abijobportal/common";
import { jobsControllers, recruiterJobControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const jobsController = jobsControllers(dependencies);
    const recruiterJobController = recruiterJobControllers(dependencies);

    router.get("/all-jobs/:page", jobsController.viewAllJobsController);

    router.get("/:id", jobsController.viewJobByJobIdController);

    router.post("/filter", jobsController.filterJobsController);

    router.use(auth(ROLES.RECRUITER));

    router.get(
        "/dashboard/cardsDetails",
        recruiterJobController.recruiterDashboardCardsController
    );

    router.get(
        "/dashboard/graphDetails",
        recruiterJobController.recruiterDashboardGraphController
    );

    router.post("/create", recruiterJobController.createJobController);

    router.patch("/edit/:jobId", recruiterJobController.editJobController);
    
    router.delete("/:id", recruiterJobController.deleteJobController);

    router.get(
        "/created-jobs/:page/:limit",
        recruiterJobController.createdJobsByRecruiterController
    );

    router.get(
        "/applications/:page/:limit",
        recruiterJobController.viewJobApplicationsController
    );

    router.get(
        "/application/:jobApplicationId",
        recruiterJobController.viewJobApplicationController
    );

    router.post(
        "/change-application-status/:jobApplicationId",
        recruiterJobController.changeJobApplicationStatusController
    );

    router.patch(
        "/change-close-status/:jobId",
        recruiterJobController.changeJobCloseStatusController
    );

    return router;
};
