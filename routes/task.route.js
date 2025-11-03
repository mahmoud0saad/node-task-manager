const { Router } = require("express");
const taskController = require("../controller/task.controller");
const { verifyJWT } = require("../middelware/jwt");
const { createTask } = require("../utils/validation");
const { validatorGenerated } = require("../middelware/validator");


const taskRouter=Router({mergeParams:true});


taskRouter.route('/')
    .post(verifyJWT,createTask,validatorGenerated,taskController.createTask)
    .get(verifyJWT,taskController.getTasks);


taskRouter.route('/project/:projectId')
     .get(verifyJWT,taskController.getTasksForProject);


taskRouter.route('/:taskId/member/:userId')
     .post(verifyJWT,taskController.assignMemberOnTask);




taskRouter.route('/:taskId/member')
     .get(verifyJWT,taskController.getTaskMembers);




module.exports={taskRouter}
