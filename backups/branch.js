const express = require('express');
const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const app = express();

app.use(express.json());

// Create a new branch
const createBranch = async (req, res) => {
  try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
          const { branch_id, branch_name, address } = req.body;  
          await pool.query(
              'INSERT INTO branch (branch_id, branch_name, address) VALUES (?, ?, ?)', 
              [branch_id, branch_name, address]
          );
          res.status(201).json({ message: 'New branch created' });
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Creating new branch failed' });
  }
};


// Get all branches
const getAllBranches = async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM branch');
      res.status(200).json(rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Fetching branches failed' });
  }
};


// Get a branch by ID
const getBranchById = async (req, res) => {
  const { id } = req.params;
  try {
      const [rows] = await pool.query('SELECT * FROM branch WHERE branch_id = ?', [id]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Branch not found' });
      }
      res.status(200).json(rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Fetching branch failed' });
  }
};


// Update a branch by ID
const updateBranch = async (req, res) => {
  const { id } = req.params;
  const { branch_name, address } = req.body;
  try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
          const [result] = await pool.query(
              'UPDATE branch SET branch_name = ?, address = ? WHERE branch_id = ?',
              [branch_name, address, id]
          );
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'Branch not found' });
          }
          res.status(200).json({ message: 'Branch updated successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Updating branch failed' });
  }
};


// Delete a branch by ID
const deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
      auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
          const [result] = await pool.query('DELETE FROM branch WHERE branch_id = ?', [id]);
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'Branch not found' });
          }
          res.status(200).json({ message: 'Branch deleted successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Deleting branch failed' });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch
};




