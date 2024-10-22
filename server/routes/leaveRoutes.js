const express = require('express');
const leaveController = require('../controllers/leaveController');
const leaveRouter = express.Router();

leaveRouter.get('/', leaveController.getEmployeeLeaves);
leaveRouter.put('/update', leaveController.updateLeaveStatus);
leaveRouter.post('/add', leaveController.addLeaveRequest);
leaveRouter.get('/types', leaveController.getLeaveTypes);
leaveRouter.get('/user', leaveController.getLeaveRequestOfUser);

module.exports = {leaveRouter};
