import { body } from 'express-validator';
import { ROLES, validateRequest } from '@abijobportal/common';

export const signinRequestBodyValidatorMiddlewares = [
    body('email').isEmail().withMessage('Email must be valid').trim().escape(),
    body('password').notEmpty().withMessage('You must supply a password').trim().escape(),
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn([ROLES.ADMIN, ROLES.CANDIDATE, ROLES.RECRUITER])
        .withMessage(`Role must be one of ${ROLES.ADMIN}, ${ROLES.CANDIDATE}, or ${ROLES.RECRUITER}`)
        .trim()
        .escape(),
    validateRequest, //now errors contain an object if the above validation fails
];
