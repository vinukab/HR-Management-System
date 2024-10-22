const express = require('express');
const router = express.Router();
const db = require('./dbConfig');  

// API route to fetch employee count by department
router.get('/emp-report', async (req, res) => {
  try {
    const query = `
      SELECT d.department_name, COUNT(e.employee_id) AS employee_count
      FROM department d
      JOIN employee e ON d.department_id = e.department_id
      GROUP BY d.department_name;
    `;

    const [results] = await db.query(query);
    

    res.json(results);  // Send the results back to the frontend as JSON
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
