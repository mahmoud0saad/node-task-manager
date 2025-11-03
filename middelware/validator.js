const { validationResult } = require("express-validator");
const { ErrorResponse } = require("../utils/response");


const validatorGenerated = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return ErrorResponse(req,res, result, result.array()[0].msg);
    }

    next();

}


module.exports = { validatorGenerated }


