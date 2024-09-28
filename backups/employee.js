const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const createEmployee = async (req, res) => {
  try {
    auth.authenticateToken(req, res, ['HR Manager','Admin'],async()=>{
      const {first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id} = req.body;
      await pool.query('INSERT INTO Employee (first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id) VALUES (?,?,?,?,?,?,?,?,?,?)', 
      [first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id]
      );
      res.status(201).json({ message: 'Employee created' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Database query failed' });
  }
};


const getEmployees = async (req, res) => {
    try {
      auth.authenticateToken(req, res, ['HR Manager','Admin'], async()=>{
        const [data] = await pool.query('SELECT * FROM employee');
        res.json(data);
      });
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
};

const deleteEmployee = async (req, res) => {
  const {employee_id} = req.body;
  try {
    auth.authenticateToken(req,res,['HR Manager','Admin'], async()=>{
      await pool.query('DELETE FROM employee WHERE employee_id = ?', [employee_id]);
      res.status(200).json({ message: 'User deleted' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

const updateEmployee = async (req, res) => {
    const { first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id } = req.body;
    const { employee_id } = req.body;
    try {
      auth.authenticateToken(res,req,['HR Manager','Admin'], async()=>{
        await pool.query('UPDATE employee SET first_name = ?, last_name = ?, birth_date = ?, marital_status = ?, emergency_contact = ?, job_title_id = ?, pay_grade_id = ?, status_id = ?, department_id = ?, supervisor_id = ? WHERE employee_id = ?', [first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id, employee_id]);
        res.status(200).json({ message: 'User updated' });
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Database query failed' });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    deleteEmployee,







    updateEmployee
};
