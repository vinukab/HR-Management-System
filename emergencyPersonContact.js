const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const createEmergencyPersonContact= async (req, res) => {
    try {
      auth.authenticateToken(req, res, ['HR Manager','Admin'],async()=>{
        const {phone_num,person_id} = req.body;
        await pool.query('INSERT INTO emergency_person_contact (phone_num, person_id) VALUES (?,?)', 
        [phone_num,person_id]
        );
        res.status(201).json({ message: 'Emergency person contact created' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'creating Emergency person contact failed' });
    }
};


const getEmergencyPerson = async (req, res) => {
  try {
    auth.authenticateToken(req, res, ['HR Manager','Admin'], async()=>{
      const [data] = await pool.query('SELECT * FROM emergency_person_contact');
      res.json(data);
   }
  );
  } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
  }
};


const deleteEmergencyPerson = async (req, res) => {
  const {person_id} = req.body;
  try {
    auth.authenticateToken(req,res,['HR Manager','Admin'], async()=>{
      await pool.query('DELETE FROM emergency_person_contact WHERE person_id = ?', [person_id]);
      res.status(200).json({ message: 'emergency person contact deleted' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'deleting query failed' });
  }
};


const updateEmergencyPerson = async (req, res) => {
  const { phone_num, person_id } = req.body;
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      // Update only the phone_num field for the given person_id
      await pool.query('UPDATE emergency_person_contact SET phone_num = ? WHERE person_id = ?', [phone_num, person_id]);
      res.status(200).json({ message: 'Emergency person contact details updated' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Updating failed' });
  }
};



module.exports = {
  createEmergencyPersonContact,
  getEmergencyPerson,
  deleteEmergencyPerson,
  updateEmergencyPerson
};