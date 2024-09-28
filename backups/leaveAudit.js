const pool = require('./dbConfig.js');
const auth = require('./authToken.js');



const createLeaveAudit = async (req, res) => {
    try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
        const { audit_id, audit_date, action, employee_id, leave_id } = req.body;
        await pool.query(
          'INSERT INTO LeaveAudit (audit_id, audit_date, action, employee_id, leave_id) VALUES (?,?,?,?,?)',
          [audit_id, audit_date, action, employee_id, leave_id]
        );
        res.status(201).json({ message: 'Leave audit created' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Creation failed' });
    }
  };

  

  const getLeaveAudits = async (req, res) => {
    try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
        const [data] = await pool.query('SELECT * FROM LeaveAudit');
        res.json(data);
      });
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  };

  

  const deleteLeaveAudit = async (req, res) => {
    const { audit_id } = req.body;
    try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
        await pool.query('DELETE FROM LeaveAudit WHERE audit_id = ?', [audit_id]);
        res.status(200).json({ message: 'Leave audit deleted' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Deletion failed' });
    }
  };

  

  const updateLeaveAudit = async (req, res) => {
    const { audit_id, audit_date, action, employee_id, leave_id } = req.body;
    try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
        await pool.query(
          'UPDATE LeaveAudit SET audit_date = ?, action = ?, employee_id = ?, leave_id = ? WHERE audit_id = ?',
          [audit_date, action, employee_id, leave_id, audit_id]
        );
        res.status(200).json({ message: 'Leave audit updated' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Update failed' });
    }
  };

  
  module.exports = {
    createLeaveAudit,
    getLeaveAudits,
    deleteLeaveAudit,
    updateLeaveAudit
  };