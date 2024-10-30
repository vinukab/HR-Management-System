const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const pool = require("./config/dbConfig")

const {createEmployee, updateEmployeeDetails,updateEmployeePersonalDetails } = require('./utils/employeeUtils');

const {userRouter} = require('./routes/userRoutes')
const {toDoRouter} = require('./routes/todoRoutes')
const {leaveRouter} = require('./routes/leaveRoutes')
const {enumRouter} = require('./routes/enumRoutes');
const reportRouter = require('./routes/reportRoutes');
const { employeeRouter } = require('./routes/employeeRoutes');
const organizationRouter = require('./routes/organizationRoutes'); 
const branchRouter = require('./routes/branchRoutes');
const payGradeRouter = require('./routes/payGradeRoutes'); 

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
app.put('/employee/:employeeId/personal', upload.single('profilePic'),updateEmployeePersonalDetails);

app.use('/auth',userRouter)
app.use('/todolist',toDoRouter)
app.use('/leave',leaveRouter)
app.use('/enum',enumRouter)
app.use('/report',reportRouter)
app.use('/employee',employeeRouter)
app.use('/organization',organizationRouter)
app.use('/branch', branchRouter);
console.log('Registering /paygrade route...');
app.use('/paygrade', payGradeRouter);

// Delete dependent endpoint
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

// Delete emergency person endpoint
app.delete('/employee/:employee_id/emergency/:person_id', async (req, res) => {
  const { employee_id, person_id } = req.params;
  console.log('Deleting emergency person', employee_id, person_id);
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



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});