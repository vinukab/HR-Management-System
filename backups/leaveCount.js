const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

// Create a LeaveCount entry
const createLeaveCount = async (req, res) => {
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      const { leave_count_id, cur_leave_count, rem_leave_count } = req.body;
      await pool.query(
        'INSERT INTO LeaveCount (leave_count_id, cur_leave_count, rem_leave_count) VALUES (?, ?, ?)',
        [leave_count_id, cur_leave_count, rem_leave_count]
      );
      res.status(201).json({ message: 'Leave count created' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Creation failed' });
  }
};

// Get all LeaveCount entries
const getLeaveCounts = async (req, res) => {
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      const [data] = await pool.query('SELECT * FROM LeaveCount');
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Get a LeaveCount entry by ID
const getLeaveCountById = async (req, res) => {
  const { leave_count_id } = req.params;
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      const [data] = await pool.query('SELECT * FROM LeaveCount WHERE leave_count_id = ?', [leave_count_id]);
      if (data.length === 0) {
        return res.status(404).json({ message: 'Leave count not found' });
      }
      res.json(data[0]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Update a LeaveCount entry
const updateLeaveCount = async (req, res) => {
  const { leave_count_id } = req.params;
  const { cur_leave_count, rem_leave_count } = req.body;
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      await pool.query(
        'UPDATE LeaveCount SET cur_leave_count = ?, rem_leave_count = ? WHERE leave_count_id = ?',
        [cur_leave_count, rem_leave_count, leave_count_id]
      );
      res.status(200).json({ message: 'Leave count updated' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Update failed' });
  }
};

// Delete a LeaveCount entry
const deleteLeaveCount = async (req, res) => {
  const { leave_count_id } = req.params;
  try {
    auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
      await pool.query('DELETE FROM LeaveCount WHERE leave_count_id = ?', [leave_count_id]);
      res.status(200).json({ message: 'Leave count deleted' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Deletion failed' });
  }
};

module.exports = {
  createLeaveCount,
  getLeaveCounts,
  getLeaveCountById,
  updateLeaveCount,
  deleteLeaveCount
};
