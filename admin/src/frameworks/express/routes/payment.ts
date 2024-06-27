import express from "express"
import { IDependenciesData } from "../../types/dependencyInterface";
import { currentUserAdminCheck, requireAuthAdmin } from "@abijobportal/common";
import { paymentControllers } from "../../../controllers";

export const paymentRouter = (dependencies: IDependenciesData)=>{
    const router = express.Router();

    const { getAllPaymentsController } = paymentControllers(dependencies);


    // recruiter
    router.get("/get-all-payments", currentUserAdminCheck, requireAuthAdmin, getAllPaymentsController);
    // router.get("/view-membership-plan/:membershipPlanId");
    // router.put("/block-unblock-membership-plan/:membershipPlanId", );
    // router.patch("/update-membership-plan");

    return router
}