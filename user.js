const pool = require('./dbConfig.js');
const auth = require('./authToken');
const jwt = require('jsonwebtoken');
const secretKey = '1234';


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE username = ? AND password_hash = ?;', [username, password]);
    if (rows.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      const user = rows[0]; 
      auth.creatAuthToken(req, res, user);
      res.status(200).json({ message: 'Login successful'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
}

const signup = async (req, res) => {
  try {
    const { username, password, role, employee_id } = req.body;
    const {first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id} = req.body;
    const isUnregistered = req.body.isUnregistered;
    // Hash the password before storing it
    const hashedPassword = password;
    if(isUnregistered){
      await pool.query('INSERT INTO Employee (first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id) VALUES (?,?,?,?,?,?,?,?,?,?)', 
        [first_name, last_name, birth_date, marital_status, emergency_contact, job_title_id, pay_grade_id, status_id, department_id, supervisor_id]
      );
    }
    await pool.query('INSERT INTO User (username, password_hash, role, employee_id) VALUES (?,?,?,?)', 
      [username, hashedPassword, role, employee_id]
    );
    login(req, res);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Database query failed' });
  }
};


const getUsers = async (req, res) => {
  auth.authenticateToken(req, res, ['HR Manager','Admin'], async () => {
     const verified = jwt.verify(req.cookies['user'],secretKey);
     res.json({	username: verified.username, role: verified.role, employee_id: verified.employee_id});
  });
};

const deleteUser = async (req, res) => {
  const { user_id,deleteEmployeeWithUser} = req.body;
  try {
    auth.authenticateToken(req,res,['HR Manager','Admin'],async()=>{
      console.log(deleteEmployeeWithUser);
      console.log(user_id);
      const [data] = await pool.query('SELECT employee_id FROM user WHERE user_id = ?', [user_id]); 
      const employee_id = data[0].employee_id;
      console.log(employee_id);
      await pool.query('DELETE FROM user WHERE user_id  = ?', [user_id ]);
      if(deleteEmployeeWithUser){
        await pool.query('DELETE FROM employee WHERE employee_id = ?', [employee_id]);
      }
      res.status(200).json({ message: 'User deleted' });
    });
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

const updateUser = async (req, res) => {
  const { user_id, username, password, role, employee_id } = req.body;
  try {
    auth.authenticateToken(req, res, ['HR Manager','Admin'], async ()=>{
      await pool.query('UPDATE user SET username = ?, password_hash = ?, role = ?, employee_id = ? WHERE user_id = ?', [username, password, role, employee_id, user_id]);
      res.status(200).json({ message: 'User updated' });
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = {
  getUsers,
  login,
  signup,
  deleteUser,
  updateUser
};
