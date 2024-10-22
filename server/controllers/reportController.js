const reportModel = require('../models/reportModel');

// Controller to fetch employees grouped by job title, department, and pay grade
async function fetchEmployeesGrouped(req, res) {
  try {
    const [results] = await reportModel.getEmployeesGrouped();
    res.json(results);
  } catch (error) {
    console.error("Error fetching employees grouped by job title, department, and pay grade:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to fetch employee count by department
async function fetchEmployeeCountByDepartment(req, res) {
  try {
    const [results] = await reportModel.getEmployeeCountByDepartment();
    res.json(results);
  } catch (error) {
    console.error("Error fetching employee count by department:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to fetch employee stats
async function fetchEmployeeStats(req, res) {
  try {
    const [results] = await reportModel.getEmployeeStats();
    res.json(results);
  } catch (error) {
    console.error("Error fetching employee stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller to fetch the total leaves by a department
async function fetchDepartmentLeaves(req, res) {
    try {
      const [results] = await reportModel.getTotalLeavesByDepartment();
      res.json(results);
    } catch (error) {
      console.error("Error fetching total leaves by department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = {
  fetchEmployeesGrouped,
  fetchEmployeeCountByDepartment,
  fetchEmployeeStats,
  fetchDepartmentLeaves
};
