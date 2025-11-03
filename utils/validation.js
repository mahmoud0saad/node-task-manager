const { body, param } = require('express-validator')

const login = [
     body('phone')
          .isMobilePhone('any').withMessage("enter valid phone")
          .notEmpty().withMessage("need field phone"),
     body('password')
          .notEmpty().withMessage("need field password")
          .isLength({ min: 6 }).withMessage("password length at least 6 char"),]
const register = [
     body('phone')
          .isMobilePhone('any').withMessage("enter valid phone")
          .notEmpty().withMessage("need field phone"),
     body('name').notEmpty().withMessage("need field name"),
     body('password')
          .notEmpty().withMessage("need field password")
          .isLength({ min: 6 }).withMessage("password length at least 6 char"),
     body('is_teacher'),


]

const addProject = [
     body('title')
          .notEmpty().withMessage('title field require'),
     body('description')
          .notEmpty().withMessage('description field require')

]

const createTask = [
     body('title')
          .notEmpty().withMessage('title field require'),
     body('projectId')
          .notEmpty().withMessage('projectId field require'),
     body('start_date')
          .isDate({format:"YYYY-MM-DD"}).withMessage('should be format YYYY-MM-DD ')

]



module.exports = { login, register, addProject, createTask }