const express = require('express');
const leaveController = require('../controllers/leaveController');
const leaveRouter = express.Router();
const {grantPrivileges} = require('../middleware/authentification');

leaveRouter.get('/', grantPrivileges('Employee'), leaveController.getEmployeeLeaves);
leaveRouter.put('/update',grantPrivileges('Supervisor'),leaveController.updateLeaveStatus);
leaveRouter.post('/add',grantPrivileges('Employee'),leaveController.addLeaveRequest);
leaveRouter.get('/types',grantPrivileges('Employee'),leaveController.getLeaveTypes);
leaveRouter.get('/user',grantPrivileges('Supervisor'),leaveController.getLeaveRequestOfUser);

leaveRouter.get('/leave-count',grantPrivileges('Employee'), leaveController.getLeaveCountDetails);               


module.exports = {leaveRouter};
