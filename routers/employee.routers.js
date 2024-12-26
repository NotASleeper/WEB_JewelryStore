const express = require('express');
const { createEmployee } = require('../controllers/employee.controllers');

const employeeRouter = express.Router();

employeeRouter.post("/", createEmployee);

module.exports = {
    employeeRouter,
}