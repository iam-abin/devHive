import "express-async-errors"
import express, { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { routes } from "./routes"
import dependencies from "../../config/dependencies";
import { NotFoundError, errorHandler } from "@abijobportal/common";
// import cookieSession from "cookie-session";

const app: Express = express();

const API_PREFIX: string = process.env.API_PREFIX || '/api/v1/profile'

app.set("trust proxy", true); // trust first proxy
// app.use(cookieSession({
//     signed:false,
//     secure:true
// }))

// Middlewares
app.use(morgan("dev"));

// app.use(express.json({ limit: '500mb' })); // Set the maximum allowed request body size
// app.use(express.urlencoded({ extended: true }));


// Set a higher limit for file uploads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));



// Routes
app.use(API_PREFIX, routes(dependencies))

app.all('*',async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };
