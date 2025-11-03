const customPrisma = require("../utils/custom_prisma");
const asyncWrapper = require("../middelware/asyncwrapper");
const { SuccessResponse, ErrorResponse } = require("../utils/response");


const getProjects = asyncWrapper(async (req, res, next) => {

    const projects = await customPrisma.project.findMany();

    return SuccessResponse(req,res, projects);

})

const addProject = asyncWrapper(async (req, res, next) => {

    const { title, description } = req.body;

    const result = await customPrisma.project.create({ data: { title: title, description: description, ownerId: req.user.id } });
    if (result) {
        return SuccessResponse(req,res, result);
    } else {
        return ErrorResponse(req,res, {}, "fail insert project");
    }

})


const deleteProject = asyncWrapper(async (req, res, next) => {

    const projectId = parseInt(req.params.id);

    const isFound = await customPrisma.project.findUnique({ where: { id: projectId } });
    if (!isFound) {
        return ErrorResponse(req,res, {}, 'project not found');

    }

    const result = await customPrisma.project.delete({ where: { id: projectId } });
    if (result) {
        return SuccessResponse(req,res, result, 'project deleted success');
    } else {
        return ErrorResponse(req,res, {}, 'fail delete project');
    }

})

const updateProject = asyncWrapper(async (req, res, next) => {
    const projectId = parseInt(req.params.id);

    
    const { title, description } = req.body;


    const isFound = await customPrisma.project.findUnique({ where: { id: projectId } });
    if (!isFound) {
        return ErrorResponse(req,res, {}, 'project not found');

    }

    const result = await customPrisma.project.update({ where: { id: projectId }, data: { title: title, description: description } });
    if (result) {
        return SuccessResponse(req,res, result, 'project deleted success');
    } else {
        return ErrorResponse(req,res, {}, 'fail delete project');
    }

})


module.exports = { getProjects, addProject, deleteProject,updateProject }