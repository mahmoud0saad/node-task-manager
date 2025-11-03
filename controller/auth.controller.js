const { SuccessResponse, ErrorResponse } = require("../utils/response");
const asyncWrapper = require("../middelware/asyncwrapper");
const { generateJWT } = require("../middelware/jwt");
const customPrisma = require("../utils/custom_prisma.js");
const hashed = require('bcrypt');
const { TEACHER, STUDENT } = require("../utils/role");

const login = asyncWrapper(async (req, res, next) => {
    console.log(req.body);
   


        const { phone, password } = req.body;

        const user = await customPrisma.user.findUnique({ where: { phone: phone } });
        if (!user) {
            return ErrorResponse(req,res, 'phone credential is not correct');
        }
        
        const isValid = await hashed.compare(password, user.password);

        if (!isValid) {
            return ErrorResponse(req,res, 'hashed credential is not correct');
        }
        const role = user.isTeacher?TEACHER:STUDENT;

        const token = await generateJWT({ id: user.id, phone: user.phone ,role:role});
        const { password: _, ...data } = user;

        return SuccessResponse(req,res, { user: data, token: token }, "message");
  

})

const register = async (req, res, next) => {
    console.log(req.body);
 
        const { phone, password, name, is_teacher } = req.body;

        const passwordHashed = await hashed.hash(password, 10);
        const isPhoneExist = await customPrisma.user.findUnique({ where: { phone: phone } });
        if (isPhoneExist) {
            return ErrorResponse(req,res, 'phone is exist try other phone');
        }
        const result = await customPrisma.user.create({ data: { name: name, phone: phone, password: passwordHashed, isTeacher: is_teacher ?? false } });
        const role = result.isTeacher?TEACHER:STUDENT;

        const token = await generateJWT({ id: result.id, phone: result.phone ,role:role});
        const { password: _, ...data } = result;

        return SuccessResponse(req,res, { user: data, token: token }, "message");
 


}


module.exports = { login, register }
