import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"

import { routes } from './frameworks/routes'
import dependencies from "./config/dependencies";

const app = express();
dotenv.config()

const API_PREFIX = process.env.API_PREFIX || '/api/v1'

app.set("trust proxy", true); // trust first proxy

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(API_PREFIX, routes(dependencies))

export { app };
