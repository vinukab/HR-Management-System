const pool = require('../config/dbConfig');

const reports = {
    async getEmployeesGrouped() {
    const query = `
        SELECT
        d.department_name AS label,
        COUNT(e.job_title_id) AS job_title,
        COUNT(DISTINCT d.department_id) AS department,
        COUNT(DISTINCT e.pay_grade_id) AS pay_grade
        FROM
        employee e
        JOIN
        department d ON e.department_id = d.department_id
        JOIN
        jobtitle jt ON e.job_title_id = jt.job_title_id
        JOIN
        paygrade pg ON e.pay_grade_id = pg.pay_grade_id
        GROUP BY
        d.department_name;
    `;
    return pool.query(query);
    },

    // Function to fetch employee count by department
    async getEmployeeCountByDepartment() {
    const query = `
        SELECT d.department_name, COUNT(e.employee_id) AS employee_count
        FROM department d
        JOIN employee e ON d.department_id = e.department_id
        GROUP BY d.department_name;
    `;
    return pool.query(query);
    },

    // Function to fetch employee stats (blood group, nationality, hobbies)
    async getEmployeeStats() {
    const query = `
        SELECT 
        d.department_name AS department,
        SUM(CASE WHEN e.blood_group = 'A+' THEN 1 ELSE 0 END) AS A_Positive,
        SUM(CASE WHEN e.blood_group = 'A-' THEN 1 ELSE 0 END) AS A_Negative,
        SUM(CASE WHEN e.blood_group = 'B+' THEN 1 ELSE 0 END) AS B_Positive,
        SUM(CASE WHEN e.blood_group = 'B-' THEN 1 ELSE 0 END) AS B_Negative,
        SUM(CASE WHEN e.blood_group = 'O+' THEN 1 ELSE 0 END) AS O_Positive,
        SUM(CASE WHEN e.blood_group = 'O-' THEN 1 ELSE 0 END) AS O_Negative,
        SUM(CASE WHEN e.nationality = 'Indian' THEN 1 ELSE 0 END) AS Nationality_Indian,
        SUM(CASE WHEN e.nationality = 'Sri Lankan' THEN 1 ELSE 0 END) AS Nationality_SriLankan,
        SUM(CASE WHEN e.nationality = 'Bangladeshi' THEN 1 ELSE 0 END) AS Nationality_Bangladeshi,
        SUM(CASE WHEN e.hobbies LIKE '%Sports%' THEN 1 ELSE 0 END) AS Hobbies_Sports,
        SUM(CASE WHEN e.hobbies LIKE '%Reading%' THEN 1 ELSE 0 END) AS Hobbies_Reading,
        SUM(CASE WHEN e.hobbies LIKE '%Traveling%' THEN 1 ELSE 0 END) AS Hobbies_Traveling
        FROM department d
        LEFT JOIN employee e ON d.department_id = e.department_id
        GROUP BY d.department_name;
    `;
    return pool.query(query);
    },

    // Function to get total leaves by department
    async  getTotalLeavesByDepartment() {
        const query = `
        SELECT
            MONTH(lr.start_date) AS month,
            d.department_name,
            COUNT(lr.leave_id) AS leave_count
        FROM
            leaverequest lr
        JOIN
            employee e ON lr.employee_id = e.employee_id
        JOIN
            department d ON e.department_id = d.department_id
        GROUP BY
            MONTH(lr.start_date), d.department_name
        ORDER BY
            MONTH(lr.start_date);
        `;

    return pool.query(query);
    }
}

module.exports = reports;