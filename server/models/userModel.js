const pool = require('../config/dbConfig');
const secretKey = '1234';
const jwt = require('jsonwebtoken');

const Role = {
    Admin: "Admin",
    HRManager: 'HR Manager',
    Employee: 'Employee',
    Supervisor: 'Supervisor'
};

const User = {
    create(user_id, username, role, employee_id, token) {
        return {
            user_id: user_id,
            username: username,
            role: role,
            employee_id: employee_id,
            token: token
        };
    },

    async login(username, password) {
        try {
            const query = 'SELECT * FROM user WHERE username = ?;';
            const [rows] = await pool.query(query, [username]);
            if (rows.length === 0) {
                throw 'Invalid username or password';
            }

            const userData = rows[0];

            if (password !== userData.password_hash) {
                throw 'Invalid username or password';
            }

            const token = jwt.sign(
                {
                    id: userData.user_id,
                    username: userData.username,
                    role: userData.role,
                    employee_id: userData.employee_id
                },
                secretKey,
                { expiresIn: '1h' }
            );
            console.log(User)
            return User.create(
                userData.user_id,
                userData.username,
                Role[userData.role],
                userData.employee_id,
                token
            );
        } catch (error) { 
            console.error('Error during login:', error);
            return undefined;
        }
    },
    async getUserDetails(token) {
        const verified = jwt.verify(token, secretKey);
        return {username: verified.username, role: verified.role, employee_id: verified.employee_id};
    }
};

module.exports = User;
