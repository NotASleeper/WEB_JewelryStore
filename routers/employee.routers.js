const { Employee } = require('../models')
const express = require('express');
const { createEmployee, getAllEmployee, getDetailEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee.controllers');
const { checkExist } = require('../middlewares/validations/checkExist');

const employeeRouter = express.Router();

employeeRouter.post("/", createEmployee);
employeeRouter.get("/", getAllEmployee);
employeeRouter.get("/:id", checkExist(Employee), getDetailEmployee);
employeeRouter.put("/:id", checkExist(Employee), updateEmployee);
employeeRouter.delete("/:id", checkExist(Employee), deleteEmployee);

module.exports = {
    employeeRouter,
}