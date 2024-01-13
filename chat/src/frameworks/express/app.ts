import { NotFoundError, errorHandler } from '@abijobportal/common';
import express from 'express'
import "express-async-errors"
import morgan from 'morgan'




const app = express()

const API_PREFIX = process.env.API_PREFIX || "/api/v1/chat";

app.set("trust proxy", true); // trust first proxy

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// // Routes
// app.use(API_PREFIX, routes(dependencies));

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };