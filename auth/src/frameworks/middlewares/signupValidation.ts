import { body } from 'express-validator';
import { ROLES, validateRequest } from '@abijobportal/common';

export const signupRequestBodyValidatorMiddlewares = [
    body('name').notEmpty().withMessage('Name is requires').trim().escape(),
    body('email').isEmail().withMessage('Email must be valid').trim().escape(),
    body('phone').notEmpty().withMessage('mobile phone must be valid').trim().escape(),
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn([ROLES.ADMIN, ROLES.CANDIDATE, ROLES.RECRUITER])
        .withMessage(`Role must be one of ${ROLES.ADMIN}, ${ROLES.CANDIDATE}, or ${ROLES.RECRUITER}`)
        .trim()
        .escape(),
    body('password')
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
        .trim()
        .escape(),
    validateRequest, //now errors contain an object if the above validation fails
];
