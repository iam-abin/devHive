import { NotFoundError, errorHandler } from '@abijobportal/common';
import express, { Express } from 'express'
import "express-async-errors"
import morgan from 'morgan'
import http from 'http'

import { routes } from './routes';
import dependencies from '../../config/dependencies';




const app: Express = express()
export const httpServer = http.createServer(app);

const API_PREFIX = process.env.API_PREFIX || "/api/v1/chat";

app.set("trust proxy", true); // trust first proxy

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use(API_PREFIX, routes(dependencies));

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };