// empReport.js (Update the route file)
const express = require('express');
const router = express.Router();
const db = require('./dbConfig'); // Assuming dbConfig.js manages the connection pool

// API route to fetch employee stats
router.get('/emp-report', async (req, res) => {
  try {
    const query = `
      SELECT 
        d.department_name AS department,
        SUM(CASE WHEN e.blood_group = 'A+' THEN 1 ELSE 0 END) AS A_Positive,
        SUM(CASE WHEN e.blood_group = 'A-' THEN 1 ELSE 0 END) AS A_Negative,
        SUM(CASE WHEN e.blood_group = 'B+' THEN 1 ELSE 0 END) AS B_Positive,
        SUM(CASE WHEN e.blood_group = 'B-' THEN 1 ELSE 0 END) AS B_Negative,
        SUM(CASE WHEN e.blood_group = 'O+' THEN 1 ELSE 0 END) AS O_Positive,
        SUM(CASE WHEN e.blood_group = 'O-' THEN 1 ELSE 0 END) AS O_Negative,
        SUM(CASE WHEN e.nationality = 'Indian' THEN 1 ELSE 0 END) AS Nationality_Indian,
        SUM(CASE WHEN e.nationality = 'Sri Lankan' THEN 1 ELSE 0 END) AS Nationality_SriLankan,
        SUM(CASE WHEN e.nationality = 'Bangladeshi' THEN 1 ELSE 0 END) AS Nationality_Bangladeshi,
        SUM(CASE WHEN e.hobbies LIKE '%Sports%' THEN 1 ELSE 0 END) AS Hobbies_Sports,
        SUM(CASE WHEN e.hobbies LIKE '%Reading%' THEN 1 ELSE 0 END) AS Hobbies_Reading,
        SUM(CASE WHEN e.hobbies LIKE '%Traveling%' THEN 1 ELSE 0 END) AS Hobbies_Traveling
      FROM department d
      LEFT JOIN employee e ON d.department_id = e.department_id
      GROUP BY d.department_name;
    `;

    const [results] = await db.query(query);
    
    res.json(results); // Send the results back to the frontend as JSON
  } catch (error) {
    console.error("Error fetching employee report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
