const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const createPerson= async (req, res) => {
    try {
      auth.authenticateToken(req, res, ['HR Manager','Admin'],async()=>{
        const {person_id,name,relatioship,address,employee_id} = req.body;
        await pool.query('INSERT INTO emergency_person (person_id,name,relationship,address,employee_id) VALUES (?,?,?,?,?)', 
        [person_id,name,relatioship,address,employee_id]
        );
        res.status(201).json({ message: ' person  created' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: ' failed' });
    }
};


const getPerson = async (req, res) => {
  try {
    auth.authenticateToken(req, res, ['HR Manager','Admin'], async()=>{
      const [data] = await pool.query('SELECT * FROM emergency_person');
      res.json(data);
   }
  );
  } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
  }
};


const deletePerson = async (req, res) => {
  const {person_id} = req.body;
  try {
    auth.authenticateToken(req,res,['HR Manager','Admin'], async()=>{
      await pool.query('DELETE FROM emergency_person WHERE person_id = ?', [person_id]);
      res.status(200).json({ message: ' person deleted' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'deleting query failed' });
  }
};


const updatePerson = async (req, res) => {
  const { person_id, name, relationship, address, employee_id } = req.body; // fixed typo in "relationship"
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      await pool.query(
        'UPDATE emergency_person SET name = ?, relationship = ?, address = ?, employee_id = ? WHERE person_id = ?',
        [name, relationship, address, employee_id, person_id]
      );
      res.status(200).json({ message: 'Details updated' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Updating failed' });
  }
};




module.exports = {
  createPerson,
  getPerson,
  deletePerson,
  updatePerson
};