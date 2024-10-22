const pool = require('../config/dbConfig');

const leaveModel = {
    getAllEmployeeLeaves: async () => {
        const query = `
            SELECT leave_id, start_date, end_date, request_status, first_name, last_name,job_title_name, type_name 
            FROM leaverequest
            JOIN employee ON employee.employee_id = leaverequest.employee_id
            JOIN jobtitle ON employee.job_title_id = jobtitle.job_title_id
            JOIN leavetype ON leaverequest.leave_type_id = leavetype.leave_type_id;
        `;
        
        const [employeeLeaves] = await pool.query(query);
        return employeeLeaves;
    },

    updateLeaveStatus: async (leave_id, status) => {
        const query = 'UPDATE leaverequest SET request_status = ? WHERE leave_id = ?';
        await pool.query(query, [status, leave_id]);
    },

    addLeaveRequest: async (employee_id, start_date, end_date, leave_type, description) => {
        const query = "INSERT INTO leaverequest (leave_id, employee_id, start_date, end_date, leave_type_id, description) VALUES (UUID(), ?, ?, ?, ?, ?);";
        await pool.query(query, [employee_id, start_date, end_date, leave_type, description]);
    },

    getLeaveTypes: async () => {
        const query = "SELECT * FROM leavetype";
        const [leaveTypes] = await pool.query(query);
        return leaveTypes;
    },

    getLeaveRequestsByEmployeeId: async (employee_id) => {
        const query = `SELECT * FROM leaverequest
            JOIN leavetype ON leavetype.leave_type_id = leaverequest.leave_type_id 
            WHERE employee_id = ?`;
        const [leaveRequests] = await pool.query(query, [employee_id]);
        return leaveRequests;
    },

    getLeaveCountDetails: async (employee_id) => {
        const query = `CALL get_leave_count_details(?);`;
        try {
            const [result] = await pool.query(query, [employee_id]);
            if (!result || result.length === 0) {
                throw new Error('No leave count details found.');
            }
            
            // Return the leave count details from the first row
            return {
                annual_leave_count: result[0][0].annual_leave_count,
                casual_leave_count: result[0][0].casual_leave_count,
                maternity_leave_count: result[0][0].maternity_leave_count,
                nopay_leave_count: result[0][0].nopay_leave_count
            };
        } catch (err) {
            console.error('Error fetching leave count details:', err);
            throw err;  // Optionally propagate the error
        }
    }
};

module.exports = leaveModel;
