import express from "express";
import "express-async-errors"
import morgan from "morgan";
import cors from 'cors'

import { routes } from "./routes"
import dependencies from "../../config/dependencies";
import { NotFoundError, errorHandler } from "@abijobportal/common";

const app = express();

const API_PREFIX = process.env.API_PREFIX || '/api/v1/payment'

app.set("trust proxy", true); // trust first proxy
app.use(cors())

// Middlewares
app.use(morgan("dev"));

app.use(express.json()); // Set the maximum allowed request body size
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(API_PREFIX, routes(dependencies))

app.all('*',async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };
