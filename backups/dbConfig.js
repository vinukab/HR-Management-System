const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'hrms',
  password: 'nsk@123K',
});

module.exports = pool.promise();
