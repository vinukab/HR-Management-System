## Database Structure

The HRMS database consists of the following tables:

- **Organization**: Stores information about organizations.
- **Department**: Stores information about various departments within an organization.
- **JobTitle**: Stores job titles available within the organization.
- **PayGrade**: Stores pay grades for different job titles.
- **EmploymentStatus**: Tracks the employment status of employees.
- **Employee**: Contains details of all employees.
- **User**: Manages user authentication and roles.
- **LeaveType**: Defines types of leave available to employees.
- **Leaves**: Tracks leave records for employees.
- **CustomField**: Allows for additional custom fields to be added to employee records.
- **EmployeeCustomField**: Stores values for custom fields associated with employees.

## Access Control by Table

### Department
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Job Title
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Pay Grade
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Employment Status
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Employee
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Dependent
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### User
- **Create (C):** Admin
- **Update (U):** Admin
- **Read (R):** Admin, HR Manager
- **Delete (D):** Admin

### Leave Type
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Leaves
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Custom Field
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

### Employee Custom Field
- **Create (C):** Admin, HR Manager
- **Update (U):** Admin, HR Manager
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** Admin, HR Manager

## Organization Table
- **Create (C):** N/A (Read-Only)
- **Update (U):** N/A (Read-Only)
- **Read (R):** All (Admin, HR Manager, Employee, Supervisor)
- **Delete (D):** N/A (Read-Only)

## Security Considerations
- Implement role-based access control (RBAC) to enforce the authorization rules.
- Sanitize input to prevent SQL injection attacks.
- Ensure secure password handling with hashing for the `User` table.
