const { check, param,header } = require("express-validator");
const Errors = {
	POST: [
		check("firstName", "name should not be empty").optional().notEmpty(),
		check("email", "email should be valid and not empty").isEmail().notEmpty(),
		check("password", "password should not empty and length must be 8 to 16 digits").notEmpty().isLength({ min: 8, max: 16 })
	],
	LOGIN:[
		check("email", "email should be valid and not empty").isEmail().notEmpty(),
		check("password", "password should not empty and length must be 8 to 16 digits").notEmpty().isLength({ min: 8, max: 16 })
	]
};
module.exports = Errors;
