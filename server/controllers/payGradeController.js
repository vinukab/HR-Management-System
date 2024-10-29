const payGradeModel = require('../models/payGradeModel');

const payGradeController = {
    
  getAllPayGrades: async (req, res) => {
    try {
      console.log('Controller: Fetching pay grades...');
      const payGrades = await payGradeModel.getAllPayGrades();
      console.log('Controller: Pay grades fetched:', payGrades); // Log fetched data
      res.status(200).json(payGrades); // Return fetched data to client
    } catch (err) {
      console.error('Controller: Error fetching pay grades:', err);
      res.status(500).json({ error: 'Error fetching pay grades' });
    }
  },
  
  addPayGrade: async (req, res) => {
    const { grade } = req.body;
    console.log('Received request to add pay grade:', grade); // Log the received grade
    try {
      const newPayGrade = await payGradeModel.addPayGrade(grade);
      console.log('Pay grade added successfully:', newPayGrade); // Log the result on success
      res.status(201).json(newPayGrade); // Send back the newly created pay grade
    } catch (err) {
      console.error('Controller Error adding pay grade:', err); // Detailed error logging
      res.status(500).json({ error: 'Error adding pay grade' });
    }
  },
  

  // Controller to delete a pay grade
  deletePayGrade: async (req, res) => {
    const { pay_grade_id } = req.params; // Get pay_grade_id from request parameters
    try {
      const result = await payGradeModel.deletePayGrade(pay_grade_id);
      res.status(200).json({ message: 'Pay grade deleted successfully', result });
    } catch (err) {
      console.error('Controller: Error deleting pay grade:', err);
      res.status(500).json({ error: 'Error deleting pay grade' });
    }
  }
};

module.exports = payGradeController;
