var router = require("express").Router();
const { authorization,authentication } = require("../middlewares/authorization");
const users = require("../controllers/users");
const errors = require("../middlewares/validator/users")

// Sign Up And Generate Otp
router.post("/create",errors.POST, users.create);

// Retrieve all Users with pagination
router.get("/findall",authentication,authorization, users.findAll);

// Retrieve all Users without pagination
router.get("/findallusers", authentication,authorization, users.findAllWithoutPagination);

// Login with Otp
router.post("/login",errors.LOGIN, users.userLogin);

module.exports = router;
