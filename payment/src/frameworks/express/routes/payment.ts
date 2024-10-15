import express from "express";

import { paymentControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";
import { checkCurrentUser, auth, ROLES } from "@abijobportal/common";

export const paymentRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const paymentController = paymentControllers(dependencies);

    router.post(
        "/create-payment",
        checkCurrentUser,
        auth(ROLES.CANDIDATE),
        paymentController.cratePaymentController
    );

    return router;
};
