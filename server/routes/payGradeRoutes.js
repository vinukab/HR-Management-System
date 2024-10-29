const express = require('express');
const payGradeController = require('../controllers/payGradeController');
const payGradeRouter = express.Router();

payGradeRouter.get('/all', (req, res) => {
  console.log('Route /paygrade/all was hit');
  payGradeController.getAllPayGrades(req, res); // Ensure this is properly calling the controller
})
payGradeRouter.post('/add', payGradeController.addPayGrade);
payGradeRouter.delete('/delete/:id', payGradeController.deletePayGrade);

module.exports = payGradeRouter;
