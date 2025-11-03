const asyncWrapper = require("../middelware/asyncwrapper");
const customPrisma = require("../utils/custom_prisma");
const { ErrorResponse, SuccessResponse } = require("../utils/response");



const createTask = asyncWrapper(async (req, res, next) => {
    const { title, start_date, end_date, description, priorityId, projectId } = req.body;

    const project = await customPrisma.project.findUnique({ where: { id: projectId } });

    if (!project) {
        return ErrorResponse(req,res, {}, "project id is invalid");
    }

    if (priorityId) {
        const priority = await customPrisma.priority.findUnique({ where: { id: priorityId } });

        if (!priority) {
            return ErrorResponse(req,res, {}, "priority id is invalid");
        }
    }

    const result = await customPrisma.task.create({ data: { title: title, userId: parseInt(req.user.id), start_date: new Date(start_date), end_date: end_date, description: description, projectId: projectId, priorityId: priorityId } });

    return SuccessResponse(req,res, result, 'success data');
});


const getTasks = asyncWrapper(async (req, res, next) => {


    const tasks = await customPrisma.task.findMany({ where: { userId: parseInt(req.user.id) } });



    return SuccessResponse(req,res, tasks, 'success tasks');


});

const getTasksForProject = asyncWrapper(async (req, res, next) => {

    const projectId = parseInt(req.params.projectId);

    const project = await customPrisma.project.findUnique({ where: { id: projectId } });

    if (!project) {
        return ErrorResponse(req,res, {}, "project id is invalid");
    }

    if (project.ownerId != req.user.id) {
        return ErrorResponse(req,res, {}, "can't access ");

    }

    const tasks = await customPrisma.task.findMany({ where: { projectId: projectId } });



    return SuccessResponse(req,res, tasks, 'success tasks');


});



const assignMemberOnTask = asyncWrapper(async (req, res, next) => {

    const taskId = parseInt(req.params.taskId);
    const userId = parseInt(req.params.userId);

    const task = await customPrisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
        return ErrorResponse(req,res, {}, "task id is invalid");
    }
    const user = await customPrisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return ErrorResponse(req,res, {}, "user id is invalid");
    }

    const result = await customPrisma.taskUsers.create({ data: { taskId: taskId, userId: userId } });


    return SuccessResponse(req,res, result, 'task added successful ');

});





const getTaskMembers = asyncWrapper(async (req, res, next) => {

    const taskId = parseInt(req.params.taskId);

    const tasks = await customPrisma.task.findUnique({
        where: { id: taskId }, include: {
            taskUsers: {
                select: {
                    user: { select: { id: true, name: true } }
                }
            }
        }
    });

    if (!tasks) {
        return ErrorResponse(req,res, {}, "task id is invalid");
    }

    const users = tasks.taskUsers.map((e) => e.user);
    delete tasks.taskUsers;
    return SuccessResponse(req,res, { ...tasks, users: users }, 'task added successful ');

});



module.exports = { createTask, getTasks, getTasksForProject, assignMemberOnTask, getTaskMembers }