const appError = require("../../todo_app/utils/appError");


function asyncWrapper(myFunc) {
    return async (req, res, next) => {
        try {
            await myFunc(req, res, next);
        } catch (e) {
            console.log(e);
            
            next(appError.create({ message: e.message, statusCode: 400 }));
        }
    }
};

module.exports = asyncWrapper;