const express = require('express');
const router = express.Router();
const db = require('./dbConfig');  // Assuming dbConfigure.js manages the connection pool

// API route to fetch total leaves by department
router.get('/department-leaves', async (req, res) => {
  try {
    // const query = `
    //   SELECT
    //     l.month,
    //     SUM(CASE WHEN d.department_id = 'DPT001' THEN l.leave_count ELSE 0 END) AS HR,
    //     SUM(CASE WHEN d.department_id = 'DPT002' THEN l.leave_count ELSE 0 END) AS Engineering,
    //     SUM(CASE WHEN d.department_id = 'DPT003' THEN l.leave_count ELSE 0 END) AS Sales
    //   FROM
    //     leaves l
    //   JOIN
    //     department d ON l.department_id = d.department_id
    //   GROUP BY
    //     l.month
    //   ORDER BY
    //     l.month;
    // `;
    

    const [results] = await db.query(query);

    res.json(results);  // Send the results back to the frontend as JSON
  } catch (error) {
    console.error("Error fetching total leaves by department:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
