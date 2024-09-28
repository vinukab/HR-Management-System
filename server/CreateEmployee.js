const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const pool = require('./dbConfig.js'); // For database connection


// Insert employee into the database
const insertEmployee = async (employeeData) => {
  const connection = await pool.getConnection();
    const sql = `
      INSERT INTO Employee (
        employee_id, first_name, last_name, birth_date, marital_status, NIC_number,
        address, status, job_title_id, pay_grade_id, supervisor_id, 
        department_id, branch_id, profile_pic
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const { firstName, lastName, birthDate, maritalStatus, NIC, address, status, leaveCountId, jobTitleId, payGradeId, supervisorId, departmentId, branchId, profilePic } = employeeData;
    
    // Execute query with values
    const [result] = await pool.query(sql, [
      uuidv4(), firstName, lastName, birthDate, maritalStatus, NIC,
      address, status, leaveCountId, jobTitleId, payGradeId, supervisorId, 
      departmentId, branchId, profilePic
    ]);

    return result;
};

const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      maritalStatus,
      NIC,
      address,
      status,
      jobTitleId,
      payGradeId,
      supervisorId,
      departmentId,
      branchId
    } = req.body;

    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    // Create employee data object
    const newEmployee = {
      firstName,
      lastName,
      birthDate,
      maritalStatus,
      NIC,
      address,
      status,
      jobTitleId,
      payGradeId,
      supervisorId,
      departmentId,
      branchId,
      profilePic
    };

    // Insert into the database
    await insertEmployee(newEmployee);

    res.status(201).json({ message: 'Employee created successfully!' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', err });
  }
};

module.exports = {createEmployee};