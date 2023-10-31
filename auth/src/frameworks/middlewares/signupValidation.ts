import { body } from "express-validator";
import { validateRequest } from "@abijobportal/common";

export const signupRequestBodyValidatorMiddlewares = [
	body("name").notEmpty().withMessage("Name is requires").trim().escape(),
	body("email").isEmail().withMessage("Email must be valid").trim().escape(),
	body("phone")
    .notEmpty()
		.withMessage("mobile phone must be valid")
		.trim()
		.escape(),
	body("password")
		.isLength({ min: 4 })
		.withMessage("Password must be between 4 and 20 characters")
		.trim()
		.escape(),
	validateRequest, //now errors contain an object if the above validation fails
];
