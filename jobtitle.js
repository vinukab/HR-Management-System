const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const createjobtitle= async (req, res) => {
    try {
      auth.authenticateToken(req, res, ['HR Manager','Admin'],async()=>{
        const {job_title_id,name,leave_count} = req.body;
        await pool.query('INSERT INTO jobtitle (job_title_id,name,leave_count) VALUES (?,?,?)', 
        [job_title_id,name,leave_count]
        );
        res.status(201).json({ message: 'new job created' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'creating new job failed' });
    }
};


const getjobdetails = async (req, res) => {
  try {
    auth.authenticateToken(req, res, ['HR Manager','Admin'], async()=>{
      const [data] = await pool.query('SELECT * FROM jobtitle');
      res.json(data);
   }
  );
  } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
  }
};


const deletejob = async (req, res) => {
  const {job_title_id} = req.body;
  try {
    auth.authenticateToken(req,res,['HR Manager','Admin'], async()=>{
      await pool.query('DELETE FROM jobtitle WHERE job_title_id = ?', [job_title_id]);
      res.status(200).json({ message: 'job:'+job_title_id+' deleted' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'deleting query failed' });
  }
};


const updatejobdetails = async (req, res) => {
  const { job_title_id, name, leave_count } = req.body;
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      await pool.query('UPDATE jobtitle SET name = ?, leave_count = ? WHERE job_title_id = ?', [name, leave_count, job_title_id]);
      res.status(200).json({ message: 'Job details updated' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Updating job details failed' });
  }
};



module.exports = {
    createjobtitle,
    getjobdetails,
    deletejob,
    updatejobdetails
};