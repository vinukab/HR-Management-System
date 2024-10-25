const { v4: uuidv4 } = require('uuid');
const pool = require('./dbConfig.js'); 


const insertEmployee = async (employeeData) => {
  const sql = `
    INSERT INTO Employee (
      employee_id, first_name, last_name, birth_date, marital_status, NIC_number,
      address,gender,profile_pic
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const employee_id = uuidv4();
  const { firstName, lastName, birthDate, maritalStatus, NIC, address, profilePic, gender} = employeeData;
  console.log(gender);
  const [result] = await pool.query(sql, [
    employee_id, firstName, lastName, birthDate, maritalStatus, NIC,
    address,gender,profilePic
  ]);

  return employee_id;
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
      gender,
      profilePic
    };

    const employee_id = await insertEmployee(newEmployee);

    res.status(201).json({ employee_id });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', err });
  }
};

const updateEmployeeDetails = async (req, res) => {

  const { employeeId, jobTitleId, payGradeId, supervisorId, departmentId, branchId } = req.body;
  console.log(employeeId, jobTitleId, payGradeId, supervisorId, departmentId, branchId);
  try {
      const result = await pool.query(`
          UPDATE employee
          SET job_title_id = ?, pay_grade_id = ?, supervisor_id = ?, department_id = ?, branch_id = ?
          WHERE employee_id = ?
      `, [jobTitleId, payGradeId, supervisorId, departmentId, branchId, employeeId]);

      return res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createEmployee,
  updateEmployeeDetails
};

const addDependencies = async (req, res) => {
  
}

const addcustomattributes = async (req, res) => {}

const addContactDetails = async (req, res) => {}  