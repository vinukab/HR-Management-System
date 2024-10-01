const express = require('express');
const pool = require('./dbConfig.js');
const auth = require('./authToken.js');

const app = express();

app.use(express.json());

const createPayGrade = async (req, res) => {
    try {
        auth.authenticateToken(req, res, ['HR Manager', 'Admin'], async () => {
            const {name} = req.body;  
            await pool.query(
                'INSERT INTO paygrade (grade_name) VALUES (?)', 
                [name]
            );
            res.status(201).json({ message: 'New paygrade created' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Creating new paygrade failed' });
    }
  };


const getAllPayGrades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM paygrade');
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Fetching pay grades failed' });
    }
};

const getPayGradeById = async (req, res) => {
    console.log('Entered to get paygrade by id', req.params.id);
    const {id} = req.params;
    try {
        const [rows] = await pool.query('SELECT grade_name FROM paygrade WHERE pay_grade_id = (?)', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Pay grade not found' });
        }

    res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Fetching pay grade failed' });
    }
};

const updatePayGrade = async (req, res) => {
    console.log('Entered to update paygrade by id', req.params.id);
    const {id } = req.params;
    const {name} = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE paygrade SET grade_name = ? WHERE pay_grade_id = ?',
            [name,id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pay grade not found' });
        }

        res.status(200).json({ message: 'Pay grade updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Updating pay grade failed' });
    }
};

const deletePayGrade = async (req, res) => {
    console.log('Entered to delete paygrade by id', req.params.id);
    const {id} = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM paygrade WHERE pay_grade_id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pay grade not found' });
        }

        res.status(200).json({ message: 'Pay grade deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Deleting pay grade failed' });
    }
};

module.exports = {
    createPayGrade,
    getAllPayGrades,
    getPayGradeById,
    updatePayGrade,
    deletePayGrade
};