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
      const employeeId = req.params.employeeId;
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
        const [rows] = await pool.query(sqlQuery, [employeeId]);
    
        // Process the results
        if (rows.length === 0) {
          return res.status(404).json({ error: "Employee not found" });
        }
    
        const employee = {
          ...rows[0], // Get the employee data from the first row
          phone_numbers: [],
          dependents: [],
          emergency_contacts: [],
        };
    
        // Loop through the rows to collect contacts, dependents, and emergency contacts
        rows.forEach(row => {
          // Collect phone numbers
          if (row.phone_number) {
            employee.phone_numbers.push(row.phone_number);
          }
    
          // Collect dependents
          if (row.dependent_name) {
            employee.dependents.push({
              name: row.dependent_name,
              relationship: row.dependent_relationship,
              gender: row.dependent_gender,
              is_covered_by_insurance: row.is_covered_by_insurance,
            });
          }
    
          // Collect emergency contacts
          if (row.emergency_contact_name) {
            employee.emergency_contacts.push({
              name: row.emergency_contact_name,
              relationship: row.emergency_contact_relationship,
              address: row.emergency_contact_address,
              phone_number: row.emergency_phone_number,
            });
          }
        });
    
        res.json(employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    

    app.get('/employee/:employeeId/personal', async (req, res) => {
      const employeeId = req.params.employeeId;
    
      const sqlEmployeeQuery = `
          SELECT employee_id, first_name, last_name, birth_date, marital_status, NIC_number, 
                 address, gender, profile_pic
          FROM employee 
          WHERE employee_id = ?;
      `;
  
      try {
          // Fetch personal information
          const [employeeRows] = await pool.query(sqlEmployeeQuery, [employeeId]);
  
          if (employeeRows.length === 0) {
              return res.status(404).json({ error: "Employee not found" });
          }
  
          const employee = {
              employee_id: employeeRows[0].employee_id,
              first_name: employeeRows[0].first_name,
              last_name: employeeRows[0].last_name,
              birth_date: employeeRows[0].birth_date,
              marital_status: employeeRows[0].marital_status,
              NIC_number: employeeRows[0].NIC_number,
              address: employeeRows[0].address,
              gender: employeeRows[0].gender,
              profile_pic: `http://localhost:5000${employeeRows[0].profile_pic}`,
              phone_numbers: [],
              custom_attributes: {}
          };
  
          // Fetch phone numbers
          const sqlContactQuery = `SELECT phone_num FROM employeecontact WHERE employee_id = ?;`;
          const [contactRows] = await pool.query(sqlContactQuery, [employeeId]);
          employee.phone_numbers = contactRows.map(row => row.phone_num);
  
          // Fetch custom attributes
          const sqlCustomAttributeQuery = `
              SELECT key_1, value_1, key_2, value_2, key_3, value_3 
              FROM customattribute 
              WHERE employee_id = ?;
          `;
          const [customAttributeRows] = await pool.query(sqlCustomAttributeQuery, [employeeId]);
  
          if (customAttributeRows.length > 0) {
              const attributes = customAttributeRows[0];
              employee.custom_attributes = {
                  ...(attributes.key_1 && { [attributes.key_1]: attributes.value_1 }),
                  ...(attributes.key_2 && { [attributes.key_2]: attributes.value_2 }),
                  ...(attributes.key_3 && { [attributes.key_3]: attributes.value_3 })
              };
          }
  
          res.json(employee);
      } catch (error) {
          console.error("Error fetching personal information:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  });
    
  app.get('/employee/:employeeId/official', async (req, res) => {
    const employeeId = req.params.employeeId;
    const sqlQuery = `
        SELECT 
            e.employee_id, 
            jt.job_title_id,           -- Include job title ID
            jt.job_title_name, 
            pg.pay_grade_id,            -- Include pay grade ID
            pg.grade AS pay_grade_name, 
            e.status, 
            sup.first_name AS supervisor_first_name,
            sup.last_name AS supervisor_last_name,
            d.department_id,            -- Include department ID
            d.department_name, 
            b.branch_id,                -- Include branch ID
            b.branch_name
        FROM 
            employee e
        LEFT JOIN 
            jobtitle jt ON e.job_title_id = jt.job_title_id
        LEFT JOIN 
            paygrade pg ON e.pay_grade_id = pg.pay_grade_id
        LEFT JOIN 
            department d ON e.department_id = d.department_id
        LEFT JOIN 
            branch b ON e.branch_id = b.branch_id
        LEFT JOIN 
            employee sup ON e.supervisor_id = sup.employee_id
        WHERE 
            e.employee_id = ?;
    `;

    try {
        const [rows] = await pool.query(sqlQuery, [employeeId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Construct response object with the added fields
        const employeeInfo = {
            employee_id: rows[0].employee_id,
            job_title_id: rows[0].job_title_id,                // Added job title ID
            job_title_name: rows[0].job_title_name,
            pay_grade_id: rows[0].pay_grade_id,                // Added pay grade ID
            pay_grade_name: rows[0].pay_grade_name,
            status: rows[0].status,
            supervisor_name: `${rows[0].supervisor_first_name} ${rows[0].supervisor_last_name}`,
            department_id: rows[0].department_id,              // Added department ID
            department_name: rows[0].department_name,
            branch_id: rows[0].branch_id,                      // Added branch ID
            branch_name: rows[0].branch_name
        };

        res.json(employeeInfo);
    } catch (error) {
        console.error("Error fetching official information:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/employee/:employeeId/dependents', async (req, res) => {
  const employeeId = req.params.employeeId;
  const sqlQuery = `
      SELECT 
          dependent_name AS name, relationship, gender, is_covered_by_insurance
      FROM 
          employeedependents 
      WHERE 
          employee_id = ?;
  `;

  try {
      const [rows] = await pool.query(sqlQuery, [employeeId]);
      res.json(rows); // Returning all dependents in an array
  } catch (error) {
      console.error("Error fetching dependents information:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/employee/:employeeId/emergency', async (req, res) => {
  const employeeId = req.params.employeeId;
  const sqlQuery = `
      SELECT 
          person_name AS name, relationship, address, phone_num AS phone_number
      FROM 
          emergencyperson 
      JOIN 
          emergencypersoncontact ON emergencyperson.person_id = emergencypersoncontact.person_id
      WHERE 
          employee_id = ?;
  `;

  try {
      const [rows] = await pool.query(sqlQuery, [employeeId]);

      // Group results by each person
      const emergencyContacts = rows.reduce((acc, row) => {
          let contact = acc.find(contact => contact.name === row.name && contact.relationship === row.relationship && contact.address === row.address);
          
          if (!contact) {
              // Add new emergency contact if it doesn't exist
              contact = {
                  name: row.name,
                  relationship: row.relationship,
                  address: row.address,
                  phone_numbers: []
              };
              acc.push(contact);
          }

          // Push phone number to the respective emergency contact's phone numbers array
          contact.phone_numbers.push(row.phone_number);
          return acc;
      }, []);

      res.json(emergencyContacts);
  } catch (error) {
      console.error("Error fetching emergency contact information:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/employee/:employeeId/personal', upload.single('profilePic'), async (req, res) => {
  const employeeId = req.params.employeeId;
  const {
      firstName,
      lastName,
      birthDate,
      maritalStatus,
      NIC,
      address,
      gender,
  } = req.body;

  const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

  const sqlUpdateQuery = `
      UPDATE employee SET 
          first_name = ?, 
          last_name = ?, 
          birth_date = ?, 
          marital_status = ?, 
          NIC_number = ?, 
          address = ?, 
          gender = ?,
          profile_pic = COALESCE(?, profile_pic) -- Only update if a new file is uploaded
      WHERE employee_id = ?;
  `;

  try {
      // Execute the update query
      const result = await pool.query(sqlUpdateQuery, [
          firstName,
          lastName,
          birthDate,
          maritalStatus,
          NIC,
          address,
          gender,
          profilePic,
          employeeId,
      ]);

      if (result[0].affectedRows === 0) {
          return res.status(404).json({ error: "Employee not found" });
      }

      res.json({ message: "Employee details updated successfully" });
  } catch (error) {
      console.error("Error updating personal information:", error);
      res.status(500).json({ error: "Internal Server Error" });
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
