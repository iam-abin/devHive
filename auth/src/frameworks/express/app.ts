import "express-async-errors";
import express, { Express } from "express";
import morgan from "morgan";
import { NotFoundError, errorHandler } from "@abijobportal/common";

import { routes } from "./routes"
import dependencies from "../../config/dependencies"
import { appConfig } from "../../config/appConfig";

const app: Express = express();


app.set("trust proxy", true); // trust first proxy

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(appConfig.API_PREFIX, routes(dependencies));

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
