import express from "express";
import "express-async-errors"
import morgan from "morgan";
// import dotenv from "dotenv"

import { routes } from './frameworks/routes'
import dependencies from "./config/dependencies";
import { NotFoundError, currentUserAdminCheck, errorHandler } from "@abijobportal/common";

const app = express();
// dotenv.config()

const API_PREFIX = process.env.API_PREFIX || '/api/v1/admin'

app.set("trust proxy", true); // trust first proxy

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(API_PREFIX, routes(dependencies))

app.all('*',async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };
