const { Router } = require("express");
const projectMemberController = require("../controller/project.member.controller");
const { verifyJWT } = require("../middelware/jwt");

const projectMemberRoute = Router({mergeParams:true});


projectMemberRoute.route('/')
    .get(verifyJWT, projectMemberController.getProjectMembers);

projectMemberRoute.route('/:userId')
    .post(verifyJWT, projectMemberController.assignToProject);



module.exports = { projectMemberRoute }