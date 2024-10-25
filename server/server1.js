const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const pool = require("./config/dbConfig")

const {createEmployee, updateEmployeeDetails } = require('./Backup/CreateEmployee');

const {userRouter} = require('./routes/userRoutes')
const {toDoRouter} = require('./routes/todoRoutes')
const {leaveRouter} = require('./routes/leaveRoutes')
const {enumRouter} = require('./routes/enumRoutes');
const reportRouter = require('./routes/reportRoutes');
const { employeeRouter } = require('./routes/employeeRoutes');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.post('/createEmployee', upload.single('profilePic'), createEmployee);
app.put('/updateJobDetails', updateEmployeeDetails);

app.post('/addDependent', async(req, res) => {

  try{
    const { dependent_name, relationship, gender, is_covered_by_insurance, employee_id } = req.body;
    const dependent_id = uuidv4();
    const query = `INSERT INTO employeedependents (dependent_id,dependent_name, relationship, gender, is_covered_by_insurance, employee_id) VALUES (?, ?, ?, ?, ?, ?)`;
    
    await pool.query(query, [dependent_id, dependent_name, relationship, gender, is_covered_by_insurance, employee_id], (err, result) => {
        res({ message: 'Dependent added successfully', result });
    });
    res.status(200).json({ message: 'Dependency added successfully' });
  }catch(error){
    console.log(error);
  }
});

app.post('/addEmergencyPerson', async (req, res) => {
      const { person_name, relationship, address, employee_id, phone_numbers } = req.body;
    
      try {
        // Insert into emergencyperson table
        const person_id = uuidv4();
        const [personResult] = await pool.query(
          `INSERT INTO emergencyperson (person_id, person_name, relationship, address, employee_id) 
          VALUES (?, ?, ?, ?, ?)`,
          [person_id,person_name, relationship, address, employee_id]
        );
    
    
        // Insert into emergencypersoncontact table
        for (let phone_num of phone_numbers) {
          await pool.query(
            `INSERT INTO emergencypersoncontact (phone_num, person_id) 
            VALUES (?, ?)`,
            [phone_num, person_id]
          );
        }
    
        res.status(200).json({ message: 'Emergency person and contact numbers added successfully' });
      } catch (error) {
        console.error('Error adding emergency person:', error);
        res.status(500).json({ message: 'Failed to add emergency person' });
      }
    });
    
app.post('/createUser', async (req, res) => {
      const { username, password, role, employee_id } = req.body;
    
      try {
        const user_id = uuidv4();
        const query = `INSERT INTO user (user_id, username, password_hash, role, employee_id) VALUES (?, ?, ?, ?, ?)`;
        await pool.query(query, [user_id, username, password, role, employee_id]);
    
        res.status(200).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
      }
    });

app.get('/employee/:employeeId', async (req, res) => {
      const { employeeId } = req.params;
      const sqlQuery = `
        SELECT 
            e.employee_id,
            e.first_name,
            e.last_name,
            e.birth_date,
            e.marital_status,
            e.NIC_number,
            e.address,
            e.status,
            e.gender,
            e.profile_pic,
            e.supervisor_id,
            e.job_title_id,
            e.pay_grade_id,
            e.department_id,
            e.branch_id,
            ep.phone_num AS phone_number,
            dep.dependent_name AS dependent_name,
            dep.relationship AS dependent_relationship,
            dep.gender AS dependent_gender,
            dep.is_covered_by_insurance,
            emg.person_name AS emergency_contact_name,
            emg.relationship AS emergency_contact_relationship,
            emg.address AS emergency_contact_address,
            ep_contact.phone_num AS emergency_phone_number
        FROM 
            employee e
        LEFT JOIN 
            employeecontact ep ON e.employee_id = ep.employee_id
        LEFT JOIN 
            employeedependents dep ON e.employee_id = dep.employee_id
        LEFT JOIN 
            emergencyperson emg ON e.employee_id = emg.employee_id
        LEFT JOIN 
            emergencypersoncontact ep_contact ON emg.person_id = ep_contact.person_id
        WHERE 
            e.employee_id = ?;
      `;
    
      try {
        const [rows] = await db.execute(sqlQuery, [employeeId]);
    
        // Process the results as shown previously
        // ...
      } catch (error) {
        console.error("Error fetching employee data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    

app.use('/auth',userRouter)
app.use('/todolist',toDoRouter)
app.use('/leave',leaveRouter)
app.use('/enum',enumRouter)
app.use('/report',reportRouter)
//app.use('/employee',employeeRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
