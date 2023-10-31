import express from "express";

import { candidateRouter } from "./candidate";

export const routes = (dependencies: any)=>{
    const router = express.Router();

    // const admin = adminRouter(dependencies);
    const candidate = candidateRouter(dependencies);


    // router.use('/', admin)
    router.use('/candidate', candidate );

    return router
}