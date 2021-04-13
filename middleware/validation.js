const { body, validationResult } = require("express-validator");
const {errorHandler} = require("../utilities/errorHandler");

// define user validation rules + sanitization
exports.userValidationRules = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  //TODO add regex for password
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters"),
  body("nickname").trim().isLength({ min: 2 }),
  body("firstName").trim(),
  body("lastName").trim(),
];

// define the user validation error handler:
exports.userValidationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const errArray = errors.array();

	const errString = mergeErrors(errArray)

  next(errorHandler(errString, 422));
};

const mergeErrors = (arrOfErrors) => arrOfErrors
	.map((error) => `${error.param}: ${error.msg}`)
	.join(". ");
