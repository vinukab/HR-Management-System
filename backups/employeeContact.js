const express = require('express');
const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const app = express();

app.use(express.json());

const createEmployeeContact = async (req, res) => {
    const { num, id } = req.body;

    try {
        await pool.query(
            'INSERT INTO employeecontact (phone_num, employee_id) VALUES (?, ?)',
            [num, id]
        );
        res.status(201).json({ message: 'Employee contact created' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create employee contact' });
    }
};

const getAllEmployeeContacts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employeecontact');
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch employee contacts' });
    }
};

const getEmployeeContactById = async (req, res) => {
    console.log('Entered to get employee contact by employee ID', req.params.id); 
    const {id} = req.params; 
    try {
        const [rows] = await pool.query('SELECT * FROM employeecontact WHERE employee_id = ?', [id]); 

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee contact not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch employee contact' });
    }
};


const updateEmployeeContact = async (req, res) => {
    console.log('Entered to update employee contact by employee ID', req.params.id); 
    const {id } = req.params;
    const {num} = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE employeecontact SET phone_num = ? WHERE employee_id = ?',
            [num, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee contact not found' });
        }

        res.status(200).json({ message: 'Employee contact updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update employee contact' });
    }
};

const deleteEmployeeContact = async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await pool.query('DELETE FROM employeecontact WHERE employee_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee contact not found' });
        }

        res.status(200).json({ message: 'Employee contact deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete employee contact' });
    }
};


module.exports = {
    createEmployeeContact,
    getAllEmployeeContacts,
    getEmployeeContactById,
    deleteEmployeeContact,
    updateEmployeeContact
}