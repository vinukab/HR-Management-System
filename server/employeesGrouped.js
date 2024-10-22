const express = require('express');
const router = express.Router();
const db = require('./dbConfig');  // Assuming dbConfigure.js manages the connection pool

// API route to fetch employees grouped by job title, department, and pay grade
router.get('/employees-grouped', async (req, res) => {
  try {
    const query = `
      SELECT
    d.department_name AS label,
    COUNT(e.job_title_id) AS job_title,
    COUNT(DISTINCT d.department_id) AS department,
    COUNT(DISTINCT e.pay_grade_id) AS pay_grade
    FROM
        employee e
    JOIN
        department d ON e.department_id = d.department_id
    JOIN
        jobtitle jt ON e.job_title_id = jt.job_title_id
    JOIN
        paygrade pg ON e.pay_grade_id = pg.pay_grade_id
    GROUP BY
        d.department_name;

    `;

    const [results] = await db.query(query);

    res.json(results);  // Send the results back to the frontend as JSON
  } catch (error) {
    console.error("Error fetching employees grouped by job title, department, and pay grade:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
