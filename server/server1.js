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

app.use('/auth',userRouter)
app.use('/todolist',toDoRouter)
app.use('/leave',leaveRouter)
app.use('/enum',enumRouter)
app.use('/report',reportRouter)
app.use('/employee',employeeRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
