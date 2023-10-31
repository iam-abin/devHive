import { body } from "express-validator";
import { validateRequest } from "@abijobportal/common";

export const signinRequestBodyValidatorMiddlewares = [
	body("email").isEmail().withMessage("Email must be valid").trim().escape(),
	body("password")
		.notEmpty()
		.withMessage("You must supply a password")
		.trim()
		.escape(),
	validateRequest, //now errors contain an object if the above validation fails
];
