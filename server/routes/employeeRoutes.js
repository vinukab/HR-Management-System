const express = require('express');
const employeeController = require('../controllers/employeeController');
const employeeRouter = express.Router();
const {grantPrivileges} = require('../middleware/authentification');

employeeRouter.get('/', employeeController.getAllEmployees);
employeeRouter.post('/addDependent', employeeController.addDependent);
employeeRouter.post('/addEmergencyPerson', employeeController.addEmergencyPerson);
employeeRouter.post('/createUser',grantPrivileges('HR Manager'), employeeController.createUser);
employeeRouter.get('/:employeeId', employeeController.getEmployee);
employeeRouter.get('/:employeeId/personal',grantPrivileges('Admin'),employeeController.getEmployeePersonal);
employeeRouter.get('/:employeeId/official', employeeController.getEmployeeOfficialInfo);
employeeRouter.get('/:employeeId/dependents', employeeController.getEmployeeDependents);
employeeRouter.get('/:employeeId/emergency', employeeController.getEmployeeEmergencyContacts);


module.exports = {employeeRouter};