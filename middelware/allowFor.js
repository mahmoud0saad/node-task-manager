const appError = require("../utils/appError")

const allowFor = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log('dine for ', req.user.role);
            return next(appError.create({ message: 'not allow do this action', statusCode: 401 }));
        }
        console.log('allow for ', roles);

        next();
    }
}


module.exports = allowFor