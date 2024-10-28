const express = require('express');
const reportRouter = express.Router();
const employeeController = require('../controllers/reportController');
const {grantPrivileges} = require('../middleware/authentification');

// Route to fetch employees grouped by job title, department, and pay grade
reportRouter.get('/employees-grouped',grantPrivileges('Supervisor'),employeeController.fetchEmployeesGrouped);

// Route to fetch employee count by department
reportRouter.get('/emp-report',grantPrivileges('Supervisor'), employeeController.fetchEmployeeCountByDepartment);

// Route to fetch employee stats
reportRouter.get('/emp-stats',grantPrivileges('Supervisor'), employeeController.fetchEmployeeStats);

// Route to fetch total leaves by department
reportRouter.get('/department-leaves',grantPrivileges('Supervisor'), employeeController.fetchDepartmentLeaves);

module.exports = reportRouter;
