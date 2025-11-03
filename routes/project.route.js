const projectController = require("../controller/project.controller");
const { Router } = require("express");
const { verifyJWT } = require("../middelware/jwt");
const { validatorGenerated } = require("../middelware/validator");
const validation = require("../utils/validation");
const allowFor = require("../middelware/allowFor");
const {   TEACHER } = require("../utils/role");

const projectRoute = Router();




projectRoute.route('/')
    .post(verifyJWT, validation.addProject, validatorGenerated, allowFor( TEACHER),projectController.addProject)
    .get(verifyJWT, validatorGenerated, projectController.getProjects);

projectRoute.route('/:id')
    .patch(verifyJWT,  allowFor( TEACHER),projectController.updateProject)
    .delete(verifyJWT, allowFor( TEACHER), projectController.deleteProject);



module.exports = { projectRoute }