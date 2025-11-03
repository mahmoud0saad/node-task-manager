const asyncWrapper = require("../middelware/asyncwrapper");
const { data } = require("../utils/appError");
const customPrisma = require("../utils/custom_prisma");
const { ErrorResponse, SuccessResponse } = require("../utils/response");



const getProjectMembers = asyncWrapper(async (req, res, next) => {
    const projectId = parseInt(req.params.projectId);
    const project = await customPrisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
        return ErrorResponse(req,res, {}, "project id is invalid");
    }
    const result = await customPrisma.projectUsers.findMany({ where: { projectId: projectId } });
    if (result.length == 0) {
        return ErrorResponse(req,res, [], "no member in project");

    }
    const members = await result.map((element => element.userId));

    const users = await customPrisma.user.findMany({ where: { id: { in: members } } });

    return SuccessResponse(req,res, { members: users }, "successful");
})


const assignToProject = asyncWrapper(async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const projectId = parseInt(req.params.projectId);

    const project = await customPrisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
        return ErrorResponse(req,res, {}, "project id is invalid");
    }

    const user = await customPrisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return ErrorResponse(req,res, {}, "user id is invalid");
    }

    const isExist = await customPrisma.projectUsers.findUnique({ where: { userId_projectId: { projectId: projectId, userId: userId } } });
    if (isExist) {
        return ErrorResponse(req,res, {}, " this user is already assign on project");

    } else {
        const result = await customPrisma.projectUsers.create({ data: { userId: userId, projectId: projectId, addedByUserId: req.user.id } });

        return SuccessResponse(req,res, result, 'member assign successful');
    }
});



module.exports = { getProjectMembers, assignToProject }
