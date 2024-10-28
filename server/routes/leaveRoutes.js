const express = require('express');
const leaveController = require('../controllers/leaveController');
const leaveRouter = express.Router();

leaveRouter.get('/', leaveController.getEmployeeLeaves);
leaveRouter.put('/update', leaveController.updateLeaveStatus);
leaveRouter.post('/add', leaveController.addLeaveRequest);
leaveRouter.get('/types', leaveController.getLeaveTypes);
leaveRouter.get('/user', leaveController.getLeaveRequestOfUser);

leaveRouter.get('/leave-count', leaveController.getLeaveCountDetails);
               


module.exports = {leaveRouter};
