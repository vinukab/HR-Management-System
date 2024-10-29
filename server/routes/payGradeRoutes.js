const express = require('express');
const payGradeController = require('../controllers/payGradeController');
const payGradeRouter = express.Router();

payGradeRouter.get('/all', (req, res) => {
  console.log('Route /paygrade/all was hit');
  payGradeController.getAllPayGrades(req, res); // Ensure this is properly calling the controller
})

// Route to add a new pay grade
payGradeRouter.post('/add', payGradeController.addPayGrade);

// Route to delete a pay grade by ID
payGradeRouter.delete('/delete/:pay_grade_id', payGradeController.deletePayGrade);

module.exports = payGradeRouter;
