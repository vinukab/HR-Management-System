const express = require('express');
const employeeController = require('../controllers/employeeController');
const employeeRouter = express.Router();

//employeeRouter.get('/', employeeController.getAllEmployees);
employeeRouter.get('/:id', employeeController.getEmployeeById);
/*employeeRouter.post('/create', employeeController.createEmployee);
employeeRouter.put('/update', employeeController.updateEmployee);
employeeRouter.delete('/delete', employeeController.deleteEmployee);*/

module.exports = {employeeRouter};
