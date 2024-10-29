const { v4: uuidv4 } = require('uuid');
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
    const payGrade = { pay_grade_id: uuidv4(), grade: `Level${grade}` }; // Dynamically create the level based on input
    try {
      const result = await payGradeModel.addPayGrade(payGrade);
      res.status(201).json({ message: 'Pay grade added successfully', result });
    } catch (err) {
      res.status(500).json({ error: 'Error adding pay grade' });
    }
  },

  deletePayGrade: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await payGradeModel.deletePayGrade(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No matching pay grade found to delete' });
      }
      res.status(200).json({ message: 'Pay grade deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting pay grade' });
    }
  }
};

module.exports = payGradeController;
