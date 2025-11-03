const asyncWrapper = require("../middelware/asyncwrapper");
const customPrisma = require("../utils/custom_prisma");
const { SuccessResponse, ErrorResponse } = require("../utils/response");


const getTaskComments = asyncWrapper(async (req, res, next) => {
    const taskId = parseInt(req.params.taskId);

    const task = await customPrisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
        return ErrorResponse(req,res, {}, 'task id invalid');
    }

    const comments = await customPrisma.comment.findMany({ where: { taskId: taskId }, include: { user: { select: { name: true, id: true } } }, omit: { userId: true, taskId: true } });


    return SuccessResponse(req,res, comments, 'success all comment on task');

});


const addCommentOnTask = asyncWrapper(async (req, res, next) => {
    const taskId = parseInt(req.params.taskId);
    const { content } = req.body;


    const task = await customPrisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
        return ErrorResponse(req,res, {}, 'task id invalid');
    }

    const result = await customPrisma.comment.create({ data: { comment: content, taskId: taskId, userId: parseInt(req.user.id) } })
    return SuccessResponse(req,res, result, 'add Comment  success on task');

});


module.exports = { getTaskComments, addCommentOnTask }