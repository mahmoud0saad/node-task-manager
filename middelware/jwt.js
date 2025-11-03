var jwt = require('jsonwebtoken');
const appError = require('../utils/appError');


async function generateJWT(payload) {
    var token = await jwt.sign(payload, 'shhhhh');
    return token;
}

async function verifyJWT(req, res, next) {
    try {

        const authorization = req.headers['authorization'];
        const token = authorization && authorization.split(' ')[1];

        var decoded = await jwt.verify(token, 'shhhhh');
        req.user = decoded;
        next();
    } catch (err) {
        console.log("req.err", err);

        next(appError.create({ message: "token is expire", data: null, statusCode: 401 }));
    }

}





module.exports = { generateJWT, verifyJWT }