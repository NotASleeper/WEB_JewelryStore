const express = require('express');
const { createEmployee, getAllEmployee, getDetailEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee.controllers');

const employeeRouter = express.Router();

employeeRouter.post("/", createEmployee);
employeeRouter.get("/", getAllEmployee);
employeeRouter.get("/:id", getDetailEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

module.exports = {
    employeeRouter,
}