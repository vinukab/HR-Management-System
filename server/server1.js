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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});