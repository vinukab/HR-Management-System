const { v4: uuidv4 } = require('uuid');
const pool = require('./dbConfig.js'); 


const insertEmployee = async (employeeData) => {
  const sql = `
    INSERT INTO Employee (
      employee_id, first_name, last_name, birth_date, marital_status, NIC_number,
      address, status, job_title_id, pay_grade_id, supervisor_id, 
      department_id, profile_pic, branch_id, gender
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,? );
  `;
  
  const { firstName, lastName, birthDate, maritalStatus, NIC, address, status, jobTitleId, payGradeId, supervisorId, departmentId, branchId, profilePic, gender } = employeeData;
  console.log(gender);
  const [result] = await pool.query(sql, [
    uuidv4(), firstName, lastName, birthDate, maritalStatus, NIC,
    address, status, jobTitleId, payGradeId, supervisorId, 
    departmentId, profilePic, branchId, gender
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
      branchId,
      gender
    } = req.body;

    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

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
      profilePic,
      gender
    };

    await insertEmployee(newEmployee);

    res.status(201).json({ message: 'Employee created successfully!' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', err });
  }
};

module.exports = {createEmployee};