const express = require("express");

const authController = require('../controller/auth.controller.js')
const validation = require("../utils/validation");
const { validatorGenerated } = require("../middelware/validator.js");
const { verifyJWT } = require("../middelware/jwt.js");

const authRoute = express.Router();


authRoute.route('/login')
        .post(validation.login, validatorGenerated, authController.login);


authRoute.route('/register')
        .post(validation.register, validatorGenerated, authController.register);




module.exports = { authRoute }