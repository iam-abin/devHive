import "express-async-errors"
import express, { Express } from 'express'
import morgan from 'morgan'
import http from 'http'
import cors from 'cors'
import compression from "compression"
import { NotFoundError, errorHandler } from '@abijobportal/common';

import { routes } from './routes';
import dependencies from '../../config/dependencies';
import { appConfig } from '../../config/appConfig';

const app: Express = express()
const httpServer = http.createServer(app);

app.set("trust proxy", true); // trust first proxy
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression())

// Routes
app.use(appConfig.API_PREFIX, routes(dependencies));

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app, httpServer };