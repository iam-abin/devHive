import express from "express"

import { IDependency } from "../../types/dependencyInterface";
import { premiumRouter } from "./premium";
import { paymentRouter } from "./payment";

export const routes = (dependencies: IDependency) =>{
    const router = express.Router();

    const premium = premiumRouter(dependencies)
    const payment = paymentRouter(dependencies)

    router.use("/premium", premium)
    router.use("/payment-route", payment)

    return router
}