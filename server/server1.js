const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const {createEmployee } = require('./Backup/CreateEmployee');

const {userRouter} = require('./routes/userRoutes')
const {toDoRouter} = require('./routes/todoRoutes')
const {leaveRouter} = require('./routes/leaveRoutes')
const {enumRouter} = require('./routes/enumRoutes');
const reportRouter = require('./routes/reportRoutes');

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
    cb(null, '.uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.post('/createEmployee', upload.single('profilePic'), createEmployee);

app.use('/auth',userRouter)
app.use('/todolist',toDoRouter)
app.use('/leave',leaveRouter)
app.use('/enum',enumRouter)
app.use('/report',reportRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
