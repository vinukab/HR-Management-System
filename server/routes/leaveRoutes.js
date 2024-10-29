const express = require('express');
const leaveController = require('../controllers/leaveController');
const leaveRouter = express.Router();

leaveRouter.get('/', leaveController.getEmployeeLeaves);
leaveRouter.put('/update', leaveController.updateLeaveStatus);
leaveRouter.post('/add', leaveController.addLeaveRequest);
leaveRouter.get('/types', leaveController.getLeaveTypes);
leaveRouter.get('/alltypes', (req, res, next) => {
    console.log('Route /leave/alltypes was hit'); // Debugging log
    next();
  }, leaveController.getAllLeaveTypes);
//leaveRouter.put('/alltypes', leaveController.editAllLeaveTypes);
leaveRouter.get('/user', leaveController.getLeaveRequestOfUser);

leaveRouter.get('/leave-count', leaveController.getLeaveCountDetails);    

// Route to add a new leave type
leaveRouter.post('/add', leaveController.addLeaveType);

// Route to delete a leave type
leaveRouter.delete('/delete/:leave_type_id', leaveController.deleteLeaveType);


module.exports = {leaveRouter};
