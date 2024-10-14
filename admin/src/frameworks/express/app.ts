import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";

import { routes } from "./routes";
import dependencies from "../../config/dependencies";
import { NotFoundError, errorHandler } from "@abijobportal/common";

const app: Express = express();
// dotenv.config()

const API_PREFIX: string = process.env.API_PREFIX || "/api/v1/admin";

app.set("trust proxy", true); // trust first proxy

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(API_PREFIX, routes(dependencies));

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
