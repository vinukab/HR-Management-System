const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require("./config/dbConfig");

const {
  createEmployee,
  updateEmployeeDetails,
  updateEmployeePersonalDetails
} = require('./utils/employeeUtils');

const { userRouter } = require('./routes/userRoutes');
const { toDoRouter } = require('./routes/todoRoutes');
const { leaveRouter } = require('./routes/leaveRoutes');
const { enumRouter } = require('./routes/enumRoutes');
const reportRouter = require('./routes/reportRoutes');
const { employeeRouter } = require('./routes/employeeRoutes');
const organizationRouter = require('./routes/organizationRoutes');
const branchRouter = require('./routes/branchRoutes');
const payGradeRouter = require('./routes/payGradeRoutes');
const readline = require('readline');
const { jobTitleRouter } = require('./routes/jobTitleRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const { dependentRouter } = require('./routes/dependentRoute');
const { emergencyContactRouter } = require('./routes/emergencyContactRouter');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use('/uploads', express.static('uploads'));

// Multer configuration for file uploads
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

// Routes
app.post('/createEmployee', upload.single('profilePic'), createEmployee);
app.put('/updateJobDetails', updateEmployeeDetails);
app.put('/employee/:employeeId/personal', upload.single('profilePic'), updateEmployeePersonalDetails);

app.use('/auth', userRouter);
app.use('/todolist', toDoRouter);
app.use('/leave', leaveRouter);
app.use('/enum', enumRouter);
app.use('/report', reportRouter);
app.use('/employee', employeeRouter);
app.use('/organization', organizationRouter);
app.use('/branch', branchRouter);
app.use('/paygrade', payGradeRouter);
app.use('/jobtitle',jobTitleRouter);
app.use('/department',departmentRouter);
app.use('/dependent',dependentRouter);
app.use('/emergencycontact',emergencyContactRouter)

// Helper function for async user input
const getInput = async (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// Endpoint to delete a dependent
app.delete('/employee/:employee_id/dependents/:dependent_id', async (req, res) => {
  const { employee_id, dependent_id } = req.params;
  const deleteQuery = 'DELETE FROM employeedependents WHERE dependent_id = ? AND employee_id = ?';

  try {
    const result = await pool.query(deleteQuery, [dependent_id, employee_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Dependent not found' });
    }
    res.status(200).json({ message: 'Dependent deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting dependent', error: err });
  }
});

// Endpoint to delete an emergency contact
app.delete('/employee/:employee_id/emergency/:person_id', async (req, res) => {
  const { employee_id, person_id } = req.params;
  const deleteQuery = 'DELETE FROM emergencyperson WHERE person_id = ? AND employee_id = ?';

  try {
    const result = await pool.query(deleteQuery, [person_id, employee_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Emergency person not found' });
    }
    res.status(200).json({ message: 'Emergency person deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting emergency person', error: err });
  }
});

// Check organization details and prompt for input if missing
const checkOrganizationDetails = async () => {
  const organizationQuery = 'SELECT * FROM organization';

  try {
    const [rows] = await pool.query(organizationQuery);
    if (rows.length === 0) {
      console.log('No organization details found. Inserting default organization details.');
      const insertQuery = `
        INSERT INTO organization 
        (organization_id, organization_name, address, registration_number, longitude, latitude)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const organizationId = uuidv4();
      const organizationName = await getInput('Enter organization name:');
      const address = await getInput('Enter organization address:');
      const registrationNumber = await getInput('Enter registration number:');
      const longitude = await getInput('Enter longitude:');
      const latitude = await getInput('Enter latitude:');
      await pool.query(insertQuery, [organizationId, organizationName, address, registrationNumber, longitude, latitude]);
    } else {
      console.log('Organization details exist.');
    }
  } catch (err) {
    console.error('Error checking for organization details', err);
    process.exit(1);
  }
};

// Check for admin user and create one if missing
const checkAdminUser = async () => {
  console.log('Checking for admin user');
  const adminQuery = 'SELECT * FROM user WHERE role = "admin"';

  try {
    const [rows] = await pool.query(adminQuery);
    if (rows.length === 0) {
      console.log('No admin user found. Please create an admin user.');
      const employeeId = uuidv4();
      const firstName = await getInput('Enter admin first name:');
      const lastName = await getInput('Enter admin last name:');
      const insertEmployeeQuery = `
        INSERT INTO employee 
        (employee_id, first_name, last_name)
        VALUES (?, ?, ?)
      `;
      await pool.query(insertEmployeeQuery, [employeeId, firstName, lastName]);
      
      const insertUserQuery = `
        INSERT INTO user 
        (user_id, username, password_hash, role, employee_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      const userId = uuidv4();
      const username = await getInput('Enter admin username:');
      const password = await getInput('Enter admin password:');
      const passwordHash = bcrypt.hashSync(password, 10);
      const role = 'admin';
     
      await pool.query(insertUserQuery, [userId, username, passwordHash, role, employeeId]);
    } else {
      console.log('Admin user exists.');
    }
  } catch (err) {
    console.error('Error checking for admin user', err);
    process.exit(1);
  }
};

// Initialize the server
const initializeServer = async () => {
  await checkOrganizationDetails();
  await checkAdminUser();

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

initializeServer();
