const { Router } = require("express");
const { getTaskComments, addCommentOnTask } = require("../controller/comment.controller");
const { verifyJWT } = require("../middelware/jwt");


const commentRouter = Router();

commentRouter.route('/task/:taskId')
    .get(verifyJWT, getTaskComments)
    .post(verifyJWT, addCommentOnTask);



module.exports = { commentRouter }