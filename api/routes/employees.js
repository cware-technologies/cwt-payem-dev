const express = require('express');
employees = express.Router();

const { EmployeeController } = require('../controllers');

employees.get('/', EmployeeController.getEmployees);
employees.get('/:id', EmployeeController.getEmployee);
employees.post('/', EmployeeController.createEmployee );
employees.put('/:id', EmployeeController.updateEmployee);
employees.delete('/:id', EmployeeController.deleteEmployee);

module.exports = employees;