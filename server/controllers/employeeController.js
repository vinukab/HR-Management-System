const employeeModel = require('../models/employeeModel');

const employeeController = {
    getEmployeeById: async (req, res) => {
        try {
            const employeeId = req.params.id;  // Retrieve employee ID from request parameters
            const employee = await employeeModel.getEmployeeById(employeeId); // Fetch employee data by ID
    
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' }); // Return 404 if employee not found
            }
    
            const processedEmployee = {
                employee_id: employee.employee_id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                birth_date: employee.birth_date,
                marital_status: employee.marital_status,
                NIC_number: employee.NIC_number,
                address: employee.address,
                status: employee.status,
                job_title_id: employee.job_title_id,
                pay_grade_id: employee.pay_grade_id,
                supervisor_id: employee.supervisor_id,
                department_id: employee.department_id,
                profile_pic: employee.profile_pic,
                branch_id: employee.branch_id,
                gender: employee.gender
            };
    
            res.status(200).json(processedEmployee); // Return the processed employee data
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching employee data' }); // Return 500 error if any issue occurs
        }
    },
    

    getAllEmployees: async (req, res) => {
        try {
            const employees = await employeeModel.getAllEmployees();
            if (employees.length === 0) {
                return res.status(404).json({ message: 'No employees found' });
            }
            res.status(200).json(employees);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching employees data' });
        }
    }
};

module.exports = employeeController;
