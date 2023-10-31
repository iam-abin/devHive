import express from "express";
import morgan from "morgan";
// import dotenv from "dotenv"

import { routes } from './frameworks/routes'
import dependencies from "./config/dependencies";
import { NotFoundError, currentUser, errorHandler } from "@abijobportal/common";

const app = express();
// dotenv.config()

const API_PREFIX = process.env.API_PREFIX || '/api/v1/admin'

app.set("trust proxy", true); // trust first proxy

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// it extract current user from jwt, if user is present add it to req.currentUser
app.use(currentUser)

// Routes
app.use(API_PREFIX, routes(dependencies))

app.all('*',async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };