const express = require('express');
const cookieParser = require('cookie-parser');

const { login,signup,getUsers,deleteUser,updateUser } = require('./user');
const { createEmployee, getEmployees, deleteEmployee, updateEmployee } = require('./employee');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.post('/login',login)
app.post('/signup',signup)
app.get('/user',getUsers)
app.delete('/user',deleteUser)
app.put('/user',updateUser)

app.post('/employees', createEmployee);
app.get('/employees', getEmployees);
app.delete('/employees', deleteEmployee);
app.put('/employees', updateEmployee);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
