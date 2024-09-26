const express = require('express');
const cookieParser = require('cookie-parser');




const { login,signup,getUsers,deleteUser,updateUser } = require('./user');
const { createEmployee, getEmployees, deleteEmployee, updateEmployee } = require('./employee');
const { createjobtitle,getjobdetails, deletejob,updatejobdetails} = require('./jobtitle');
const { createEmergencyPersonContact,getEmergencyPerson,deleteEmergencyPerson,updateEmergencyPerson} = require('./emergencyPersonContact')
const {createPerson,getPerson,deletePerson,updatePerson} = require('./emergencyPerson')
const { createDependent, getDependents, deleteDependent, updateDependent } = require('./employeeDependents');
const { createLeaveAudit, getLeaveAudits, deleteLeaveAudit, updateLeaveAudit } = require('./leaveAudit');
const { createLeaveCount, getLeaveCounts, getLeaveCountById, updateLeaveCount, deleteLeaveCount } = require('./leaveCount');



const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());





//crud for user table
app.post('/login',login)
app.post('/signup',signup)
app.get('/user',getUsers)
app.delete('/user',deleteUser)
app.put('/user',updateUser)

//crud for employee table
app.post('/employees', createEmployee);
app.get('/employees', getEmployees);
app.delete('/employees', deleteEmployee);
app.put('/employees', updateEmployee);

//crud for jobtitle table
app.post('/jobtitle', createjobtitle);
app.get('/jobtitle', getjobdetails);
app.delete('/jobtitle', deletejob);
app.put('/jobtitle', updatejobdetails);

//crud for emergency person contact table
app.post('/emergencyPersonContact', createEmergencyPersonContact);
app.get('/emergencyPersonContact', getEmergencyPerson);
app.delete('/emergencyPersonContact', deleteEmergencyPerson);
app.put('/emergencyPersonContact', updateEmergencyPerson);


//crud for emergency person table
app.post('/emergencyPerson', createPerson);
app.get('/emergencyPerson', getPerson);
app.delete('/emergencyPerson', deletePerson);
app.put('/emergencyPerson', updatePerson);

//crud for employeeDependent table
app.post('/employeeDependents', createDependent);
app.get('/employeeDependents', getDependents);
app.delete('/employeeDependents', deleteDependent);
app.put('/employeeDependents', updateDependent);



//crud for leave audit table
app.post('/leaveAudit', createLeaveAudit);
app.get('/leaveAudit', getLeaveAudits);
app.delete('/leaveAudit', deleteLeaveAudit);
app.put('/leaveAudit', updateLeaveAudit);


//crud for leave count table
app.post('/leaveCount', createLeaveCount);
app.get('/leaveCount', getLeaveCounts);
app.get('/leaveCount/:leave_count_id', getLeaveCountById);
app.put('/leaveCount/:leave_count_id', updateLeaveCount);
app.delete('/leaveCount/:leave_count_id', deleteLeaveCount);





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get("/",(req,res) => {
  res.send("Hello World");
});
