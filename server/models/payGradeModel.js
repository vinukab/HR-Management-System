const db = require('../config/dbConfig'); // Ensure correct import

const payGradeModel = {
  // Function to get all pay grades from the database
  getAllPayGrades: async () => {
    const query = 'SELECT pay_grade_id, grade FROM hrms.paygrade';
    try {
      console.log('Model: Executing database query to fetch pay grades...');
      const [rows] = await db.execute(query); // Execute the query
      console.log('Model: Query Result:', rows); // Log the fetched data
      return rows; // Ensure the rows are returned
    } catch (err) {
      console.error('Model: Error fetching pay grades from the database:', err);
      throw err; // Pass the error back to the controller
    }
  },

  // Function to add a new pay grade
  addPayGrade: async (grade) => {
    const query = 'INSERT INTO hrms.paygrade (grade) VALUES (?)';
    console.log('Executing query to add pay grade:', query, 'with grade:', grade); // Log query and data
    try {
      const [result] = await db.execute(query, [grade]);
      console.log('Query result:', result); // Log the query result
      return { pay_grade_id: result.insertId, grade };
    } catch (err) {
      console.error('Model Error adding pay grade:', err); // Detailed error logging
      throw err; // Pass error up to the controller
    }
  },
  

  // Function to delete a pay grade by ID
  deletePayGrade: async (payGradeId) => {
    const query = 'DELETE FROM hrms.paygrade WHERE pay_grade_id = ?';
    try {
      const [result] = await db.execute(query, [payGradeId]);
      console.log('Model: Pay grade deleted successfully');
      return result;
    } catch (err) {
      console.error('Model: Error deleting pay grade:', err);
      throw err;
    }
  }
};

module.exports = payGradeModel;
