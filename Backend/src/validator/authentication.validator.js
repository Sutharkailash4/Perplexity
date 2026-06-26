import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

export const registerValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is Required")
        .isLength({ min: 3, max: 30 }).withMessage("Username Must be Between 3 and 30 Characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can Only Contain Letters, Numbers, and Underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is Required")
        .isEmail().withMessage("Please Provide a Valid Email"),

    body("password")
        .notEmpty().withMessage("Password is Required")
        .isLength({ min: 6 }).withMessage("Password Must be at Least 6 Characters"),
    
    validate
];

export const loginValidator = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email is Required")
    .isEmail().withMessage("Please Provide a Valid Email"),

    body("password")
    .notEmpty().withMessage("Password is Required")
    .isLength({ min: 6 }).withMessage("Password Must be at Least 6 Characters"),

    validate
];