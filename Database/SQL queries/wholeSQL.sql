drop database hrms;
-- ################################################ table creation queries ################################################
create database hrms;
use hrms;
CREATE TABLE organization (
    organization_id VARCHAR(50) PRIMARY KEY,
    organization_name VARCHAR(50),
    address VARCHAR(100),
    registration_number VARCHAR(50),
    latitude DECIMAL(10,0),
    longitude DECIMAL(10,0)
);

CREATE TABLE paygrade (
    pay_grade_id VARCHAR(50) PRIMARY KEY,
    grade ENUM('Level1', 'Level2', 'Level3', 'Level4')
);

CREATE TABLE jobtitle (
    job_title_id VARCHAR(50) PRIMARY KEY,
    job_title_name VARCHAR(50)
);

CREATE TABLE branch (
    branch_id VARCHAR(50) PRIMARY KEY,
    branch_name VARCHAR(50),
    address VARCHAR(100)
);

CREATE TABLE department (
    department_id VARCHAR(50) PRIMARY KEY,
    department_name VARCHAR(50),
    organization_id VARCHAR(50),
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);


CREATE TABLE employee (
    employee_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    marital_status VARCHAR(50),
    NIC_number VARCHAR(50),
    address VARCHAR(50),
    status ENUM('Intern parttime','Intern fultime','Contract parttime','Contract fultime','Permanent','Freelance'),
    job_title_id VARCHAR(50),
    pay_grade_id VARCHAR(50),
    supervisor_id VARCHAR(50),
    department_id VARCHAR(50),
    profile_pic VARCHAR(50),
    branch_id VARCHAR(50),
    gender ENUM('male', 'female'),
    FOREIGN KEY (job_title_id) REFERENCES jobtitle(job_title_id),
    FOREIGN KEY (pay_grade_id) REFERENCES paygrade(pay_grade_id),
    FOREIGN KEY (supervisor_id) REFERENCES employee(employee_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id),
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

CREATE TABLE customattribute (
    employee_id VARCHAR(50) PRIMARY KEY,
    key_1 VARCHAR(50),
    value_1 VARCHAR(50),
    key_2 VARCHAR(50),
    value_2 VARCHAR(50),
    key_3 VARCHAR(50),
    value_3 VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE emergencyperson (
    person_id VARCHAR(50) PRIMARY KEY,
    person_name VARCHAR(50),
    relationship VARCHAR(50),
    address VARCHAR(100),
    employee_id VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE emergencypersoncontact (
    phone_num VARCHAR(50) PRIMARY KEY,
    person_id VARCHAR(50),
    FOREIGN KEY (person_id) REFERENCES emergencyperson(person_id)
);

CREATE TABLE employeecontact (
    phone_num VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE employeedependents (
    dependent_id VARCHAR(50) PRIMARY KEY,
    dependent_name VARCHAR(50),
    relationship VARCHAR(50),
    gender VARCHAR(50),
    is_covered_by_insurance TINYINT(1),
    employee_id VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE attendance (
    attendance_id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50),
    date DATE,
    status ENUM('Present', 'Absent', 'Leave'),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE leavetype (
    leave_type_id VARCHAR(50) PRIMARY KEY,
    type_name ENUM('Casual Leave', 'Annual Leave', 'Maternity Leave', 'No Pay'),
    default_days INT,
    pay_grade_id VARCHAR(50),
    FOREIGN KEY (pay_grade_id) REFERENCES paygrade(pay_grade_id)
);

CREATE TABLE leaverequest (
    leave_id VARCHAR(50) PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    description VARCHAR(255),
    request_status ENUM('Pending', 'Approved', 'Rejected'),
    employee_id VARCHAR(50),
    leave_type_id VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (leave_type_id) REFERENCES leavetype(leave_type_id)
);


CREATE TABLE leavecount (
    employee_id VARCHAR(50),
    leave_type_id VARCHAR(50),
    rem_leave_count INT,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (leave_type_id) REFERENCES leavetype(leave_type_id)
);

CREATE TABLE user (
    user_id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50),
    password_hash VARCHAR(255),
    role ENUM('Admin', 'HR Manager', 'Employee', 'Supervisor'),
    employee_id VARCHAR(50),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE notifications (
    notification_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    message VARCHAR(255),
    date DATE,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE todolist (
    todo_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    task VARCHAR(255),
    due_date DATE,
    status TINYINT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- ############################################ view creation queries ############################################
create view EmployeeDetails as
select e.first_name, e.last_name, j.job_title_name, d.department_name, b.branch_name 
from employee e join jobtitle j on e.job_title_id = j.job_title_id
	        join department d on e.department_id = d.department_id
                join branch b on e.branch_id = b.branch_id;


create view rem_leave_count as
select e.first_name, e.last_name, lt.type_name, lc.rem_leave_count
from employee e join leavecount lc on e.employee_id = lc.employee_id
	        join leavetype lt on lc.leave_type_id = lt.leave_type_id;

create view user_info as
select 
    u.user_id,
    u.username,
    u.role,
    e.first_name,
    e.last_name,
    e.nic_number,
    e.birth_date,
    e.marital_status,
    e.address as employee_address,
    e.status as employment_status,
    e.gender,
    j.job_title_name,
    d.department_name,
    b.branch_name
from 
    user u
join 
    employee e on u.employee_id = e.employee_id
join 
    jobtitle j on e.job_title_id = j.job_title_id
join 
    department d on e.department_id = d.department_id
join 
    branch b on e.branch_id = b.branch_id;


create view leave_requests_info as
select 
    lr.leave_id,
    e.first_name,
    e.last_name,
    lt.type_name,
    lr.start_date,
    lr.end_date,
    lr.description,
    lr.request_status as leave_status
from 
    leaverequest lr
join 
    employee e on lr.employee_id = e.employee_id
join 
    leavetype lt on lr.leave_type_id = lt.leave_type_id;



create view department_employee_count as
select 
    d.department_name,
    count(e.employee_id) as employee_count
from 
    department d
left join 
    employee e on d.department_id = e.department_id
group by 
    d.department_name;


create view employee_emergency_contact as
select 
    e.employee_id,
    e.first_name,
    e.last_name,
    ep.person_name,
    epc.phone_num,
    ep.relationship
from 
    employee e
join 
    emergencyperson ep on e.employee_id = ep.employee_id
join 
    emergencypersoncontact epc on ep.person_id = epc.person_id;

-- ################################################## function creation queries ##################################################

DELIMITER $$
CREATE FUNCTION get_annual_lc(emply_id VARCHAR(50)) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE rem_leave_count INT;
    
    SELECT lc.rem_leave_count 
    INTO rem_leave_count
    FROM leavecount lc JOIN leavetype lt ON lc.leave_type_id=lt.leave_type_id
    WHERE lc.employee_id = emply_id 
    AND lt.type_name = 'Annual Leave';
    
    RETURN rem_leave_count;
    END $$


DELIMITER $$

CREATE FUNCTION get_casual_lc(emply_id VARCHAR(50)) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE rem_leave_count INT;
    
    SELECT lc.rem_leave_count 
    INTO rem_leave_count
    FROM leavecount lc JOIN leavetype lt ON lc.leave_type_id=lt.leave_type_id
    WHERE lc.employee_id = emply_id 
    AND lt.type_name = 'Casual Leave';
    
    RETURN rem_leave_count;
END $$

DELIMITER $$

CREATE FUNCTION get_maternity_lc(emply_id VARCHAR(50)) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE rem_leave_count INT;
    
    SELECT lc.rem_leave_count 
    INTO rem_leave_count
    FROM leavecount lc JOIN leavetype lt ON lc.leave_type_id=lt.leave_type_id
    WHERE lc.employee_id = emply_id 
    AND lt.type_name = 'Maternity Leave';
    
    RETURN rem_leave_count;
END $$

DELIMITER $$

CREATE FUNCTION get_nopay_lc(emply_id VARCHAR(50)) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE rem_leave_count INT;
    
    SELECT lc.rem_leave_count 
    INTO rem_leave_count
    FROM leavecount lc JOIN leavetype lt ON lc.leave_type_id=lt.leave_type_id
    WHERE lc.employee_id = emply_id 
    AND lt.type_name = 'No Pay';
    
    RETURN rem_leave_count;
END $$

DELIMITER $$

CREATE FUNCTION get_attendance_count(p_start_date DATE, p_end_date DATE, p_employee_id VARCHAR(50)) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE present_days INT;
    SELECT COUNT(*) INTO present_days
    FROM attendance 
    WHERE p_employee_id = employee_id 
    AND date BETWEEN p_start_date AND p_end_date 
    AND status = 'Present';
    
    RETURN present_days;
END $$

DELIMITER ;

DELIMITER $$
CREATE FUNCTION is_allowed_leave_type(
    employee_pay_grade_id VARCHAR(50),
    employee_gender ENUM('male', 'female'),
    in_leave_type_id VARCHAR(50)
) RETURNS TINYINT(1)
    READS SQL DATA
BEGIN
    DECLARE constraint_count INT;

    SELECT COUNT(*) INTO constraint_count
    FROM leavetype 
    WHERE leave_type_id = in_leave_type_id
    AND (pay_grade_id = employee_pay_grade_id OR pay_grade_id IS NULL)
    AND ((type_name = 'Maternity Leave' AND employee_gender = 'female') OR type_name != 'Maternity Leave');
    IF constraint_count > 0 THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END$$

-- ###################################################### procedure creation queries ######################################################
DELIMITER $$

CREATE PROCEDURE record_leave_request(
	p_leave_id VARCHAR(50),
    p_employee_id VARCHAR(50),
    p_leave_type_id VARCHAR(50),
    p_start_date DATE,
    p_end_date DATE,
    p_description VARCHAR(255)
)
BEGIN
    INSERT INTO leaverequest (leave_id,employee_id, leave_type_id, start_date, end_date, description, request_status)
    VALUES (p_leave_id,p_employee_id, p_leave_type_id, p_start_date, p_end_date, p_description, 'Pending');
    
    COMMIT;
END$$

DELIMITER $$

CREATE PROCEDURE assign_task(
	p_todo_id VARCHAR(50),
    p_user_id VARCHAR(50),
    p_task VARCHAR(255),
    p_due_date DATE
)
BEGIN
    INSERT INTO todolist (todo_id,user_id, task, due_date, status)
    VALUES (p_todo_id, p_user_id, p_task, p_due_date, 0);
    
    COMMIT;
END$$

DELIMITER $$

CREATE PROCEDURE get_leave_count_details (
    IN emply_id VARCHAR(50)
)
BEGIN
    SELECT
        get_annual_lc(emply_id) AS annual_leave_count,
        get_casual_lc(emply_id) AS casual_leave_count,
        get_maternity_lc(emply_id) AS maternity_leave_count,
        get_nopay_lc(emply_id) AS nopay_leave_count;
END$$

DELIMITER $$

CREATE PROCEDURE employees_count_by_department()
BEGIN
    SELECT d.department_name, COUNT(e.employee_id) AS employee_count
    FROM department d 
    LEFT JOIN employee e ON e.department_id = d.department_id
    GROUP BY d.department_name;
END$$

DELIMITER $$

CREATE PROCEDURE total_leaves_by_department_in_period (
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT d.department_name, SUM(DATEDIFF(lr.end_date, lr.start_date) + 1) AS total_leave_days
    FROM department d 
    LEFT JOIN employee e ON d.department_id = e.department_id
    LEFT JOIN leaverequest lr ON e.employee_id = lr.employee_id
    WHERE 
        (lr.start_date BETWEEN p_start_date AND p_end_date 
        OR lr.end_date BETWEEN p_start_date AND p_end_date)
        AND lr.request_status = 'Approved'
    GROUP BY d.department_name;
END$$

DELIMITER $$

CREATE PROCEDURE get_attendance_count_by_department (
    p_date DATE, 
    p_department_name VARCHAR(50)
)
BEGIN
    SELECT COUNT(*) AS attendance_count
    FROM department d 
    LEFT JOIN employee e ON e.department_id = d.department_id
    LEFT JOIN attendance a ON a.employee_id = e.employee_id
    WHERE d.department_name = p_department_name 
    AND a.date = p_date 
    AND a.status = 'Present';
END$$


create procedure get_employee_details(
    p_employee_id VARCHAR(50)
)
begin
    select 
        e.employee_id,
        e.first_name,
        e.last_name,
        e.gender,
        e.nic_number,
        e.birth_date,
        e.marital_status,
        e.address,
        e.status,
        jt.job_title_name,
        d.department_name,
        b.branch_name,
        pg.grade
    from 
        employee e
    inner join 
        jobtitle jt on e.job_title_id = jt.job_title_id
    inner join 
        department d on e.department_id = d.department_id
    inner join 
        branch b on e.branch_id = b.branch_id
    inner join 
        paygrade pg on e.pay_grade_id = pg.pay_grade_id
    where 
        e.employee_id = p_employee_id;
end $$

DELIMITER ;

-- ####################################################### trigger creation queries #######################################################
DELIMITER $$

CREATE TRIGGER haddle_new_employee
AFTER INSERT ON employee
FOR EACH ROW
BEGIN
    DECLARE current_leave_type_id VARCHAR(50);
    DECLARE current_default_days INT;
    DECLARE done INT DEFAULT 0; 
    
    DECLARE leave_type_cursor CURSOR FOR 
        SELECT leave_type_id, default_days FROM leavetype;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN leave_type_cursor;

    read_loop: LOOP
        FETCH leave_type_cursor INTO current_leave_type_id, current_default_days;

        IF done THEN
            LEAVE read_loop;
        END IF;

        IF is_allowed_leave_type(NEW.pay_grade_id, NEW.gender, current_leave_type_id) = 1 THEN
            INSERT INTO leavecount (employee_id, leave_type_id, rem_leave_count) 
            VALUES (NEW.employee_id, current_leave_type_id, current_default_days);
        END IF;
    END LOOP;

    CLOSE leave_type_cursor;
END$$

DELIMITER $$

CREATE TRIGGER update_leave_count
AFTER UPDATE ON leaverequest
FOR EACH ROW
BEGIN
    IF NEW.request_status = 'Approved' THEN
        UPDATE leavecount
        SET rem_leave_count = rem_leave_count - (DATEDIFF(NEW.end_date, NEW.start_date) + 1)
        WHERE employee_id = NEW.employee_id 
        AND leave_type_id = NEW.leave_type_id;
    END IF;
END$$

DELIMITER ;

-- ####################################################### data insertion queries #######################################################
INSERT INTO organization (organization_id, organization_name, address, registration_number, latitude, longitude)
VALUES 
('001', 'Jupiter Apparels', 'No. 123, Galle Road, Colombo, Sri Lanka', 'BR123456789', 6.927079, 79.861244);


INSERT INTO paygrade (pay_grade_id, grade)
VALUES 
('PG001', 'Level1'),
('PG002', 'Level2'),
('PG003', 'Level3'),
('PG004', 'Level4');


INSERT INTO jobtitle (job_title_id, job_title_name)
VALUES
('JT001', 'HR Manager'),
('JT002', 'Accountant'),
('JT003', 'Software Engineer'),
('JT004', 'QA Engineer'),
('JT005', 'Sales Manager'),
('JT006', 'Production Supervisor'),
('JT007', 'Marketing Executive'),
('JT008', 'IT Support Specialist'),
('JT009', 'Customer Service Representative'),
('JT010', 'Supply Chain Manager');

INSERT INTO branch (branch_id, branch_name, address)
VALUES
('BR001', 'Head Office - Sri Lanka', 'No. 123, Union Place, Colombo 02, Sri Lanka'),
('BR002', 'Bangladesh Branch', 'House 20, Road 15, Gulshan 1, Dhaka, Bangladesh'),
('BR003', 'Pakistan Branch', 'Plot #15, Block A, Industrial Area, Karachi, Pakistan');



INSERT INTO department (department_id, department_name, organization_id)
VALUES
('DPT001', 'Human Resources', '001'),
('DPT002', 'Finance', '001'),
('DPT003', 'Information Technology', '001'),
('DPT004', 'Sales', '001'),
('DPT005', 'Marketing', '001'),
('DPT006', 'Production', '001'),
('DPT007', 'Quality Assurance', '001'),
('DPT008', 'Customer Service', '001'),
('DPT009', 'Supply Chain', '001'),
('DPT010', 'Research and Development', '001');

INSERT INTO leavetype (leave_type_id, type_name, default_days, pay_grade_id) VALUES 
('LT001', 'Casual Leave', 12, 'PG001'),
('LT002', 'Casual Leave', 14, 'PG002'),
('LT003', 'Casual Leave', 16, 'PG003'),
('LT004', 'Casual Leave', 18, 'PG004'),
('LT005', 'Annual Leave', 20, 'PG001'),
('LT006', 'Annual Leave', 22, 'PG002'),
('LT007', 'Annual Leave', 24, 'PG003'),
('LT008', 'Annual Leave', 26, 'PG004'),
('LT009', 'Maternity Leave', 90, 'PG001'),
('LT010', 'Maternity Leave', 90, 'PG002'),
('LT011', 'Maternity Leave', 100, 'PG003'),
('LT012', 'Maternity Leave', 100, 'PG004'),
('LT013', 'No Pay', 50, NULL);

INSERT INTO employee (employee_id, first_name, last_name, birth_date, marital_status, NIC_number, address, status, job_title_id, pay_grade_id, supervisor_id, department_id, profile_pic, branch_id, gender)
VALUES
('EMP001', 'John', 'Perera', '1985-08-15', 'Married', 'NIC001', 'No. 25, Union Place, Colombo', 'Permanent', 'JT001', 'PG003', NULL, 'DPT001', 'profile_john.jpg', 'BR001', 'male'),
('EMP002', 'Amaya', 'Fernando', '1990-05-21', 'Single', 'NIC002', 'No. 18, Galle Road, Mount Lavinia', 'Permanent', 'JT002', 'PG002', 'EMP001', 'DPT002', 'profile_amaya.jpg', 'BR001', 'female'),
('EMP003', 'Nuwan', 'Wijesinghe', '1988-12-10', 'Married', 'NIC003', 'No. 12, Kandy Road, Kandy', 'Permanent', 'JT003', 'PG003', 'EMP001', 'DPT003', 'profile_nuwan.jpg', 'BR001', 'male'),
('EMP004', 'Kumari', 'De Silva', '1992-04-12', 'Single', 'NIC004', 'No. 78, Negombo Road, Negombo', 'Contract parttime', 'JT004', 'PG003', 'EMP001', 'DPT007', 'profile_kumari.jpg', 'BR001', 'female' ),
('EMP005', 'Saman', 'Ratnayake', '1987-11-05', 'Married', 'NIC005', 'No. 33, Highlevel Road, Maharagama', 'Permanent', 'JT005', 'PG003', 'EMP001', 'DPT004', 'profile_saman.jpg', 'BR001', 'male'),
('EMP006', 'Tharusha', 'Galappaththi', '1985-12-07', 'Married', 'NIC006', 'No. 77/1, Anandarama Road, Maharagama', 'Intern fultime', 'JT003', 'PG002', 'EMP001', 'DPT003', 'profile_tharusha.jpg', 'BR001', 'male'),
('EMP007', 'Kasun', 'Kumaranayake', '1990-08-17', 'Single', 'NIC007', 'No. 563, Yatiyana Road, Matara', 'Permanent', 'JT005', 'PG002', 'EMP001', 'DPT002', 'profile_kasun.jpg', 'BR001', 'male' ),
('EMP008', 'Sajitha', 'Gallage', '1992-10-12', 'Married', 'NIC008', 'No. 28/C, Galle Road, Ambepitiya', 'Freelance', 'JT004', 'PG003', 'EMP001', 'DPT004', 'profile_sajitha.jpg', 'BR001', 'male') ;

INSERT INTO customattribute (employee_id, key_1, value_1, key_2, value_2, key_3, value_3)
VALUES
('EMP001', 'Blood Group', 'O+', 'Hobbies', 'Photography', 'Language Skills', 'English, Sinhala'),
('EMP002', 'Blood Group', 'A-', 'Hobbies', 'Reading', 'Language Skills', 'English, Sinhala'),
('EMP003', 'Blood Group', 'B+', 'Hobbies', 'Cycling', 'Language Skills', 'English, Sinhala, Tamil'),
('EMP004', 'Blood Group', 'AB+', 'Hobbies', 'Cooking', 'Language Skills', 'English, Sinhala'),
('EMP005', 'Blood Group', 'O-', 'Hobbies', 'Travelling', 'Language Skills', 'English, Sinhala');

INSERT INTO emergencyperson (person_id, person_name, relationship, address, employee_id)
VALUES
('P001', 'Mala Perera', 'Wife', 'No. 25, Union Place, Colombo', 'EMP001'),
('P002', 'Kasun Fernando', 'Brother', 'No. 18, Galle Road, Mount Lavinia', 'EMP002'),
('P003', 'Sanduni Wijesinghe', 'Wife', 'No. 12, Kandy Road, Kandy', 'EMP003'),
('P004', 'Nadeeka De Silva', 'Sister', 'No. 78, Negombo Road, Negombo', 'EMP004'),
('P005', 'Lakmini Ratnayake', 'Wife', 'No. 33, Highlevel Road, Maharagama', 'EMP005');

INSERT INTO emergencypersoncontact (phone_num, person_id)
VALUES
('0771234567', 'P001'),
('0762345678', 'P002'),
('0713456789', 'P003'),
('0722233445', 'P004'),
('0753344556', 'P005');

INSERT INTO employeecontact (phone_num, employee_id)
VALUES
('0771122334', 'EMP001'),
('0762233445', 'EMP002'),
('0713344556', 'EMP003'),
('0724455667', 'EMP004'),
('0755566778', 'EMP005');

INSERT INTO employeedependents (`dependent_id`, `dependent_name`, `relationship`, `gender`, `is_covered_by_insurance`, `employee_id`) VALUES 
('ED001', 'Mala Perera', 'Wife', 'female', 1, 'EMP001'),
('ED002', 'Kasun Perera', 'Son', 'male', 0, 'EMP001'),
('ED003', 'Sanduni Wijesinghe', 'Wife', 'female', 0, 'EMP003'),
('ED004', 'Sithmini Wijesinghe', 'Daughter', 'female', 0, 'EMP003'),
('ED005', 'Rumesh De Silva', 'Father', 'male', 0, 'EMP004'),
('ED006', 'Lakmini Ratnayake', 'Wife', 'female', 1, 'EMP005'),
('ED007', 'Sriyani Ratnayake', 'Mother', 'female', 1, 'EMP005');

INSERT INTO attendance (`attendance_id`, `employee_id`, `date`, `status`) VALUES 
('A001', 'EMP001', '2024-10-01', 'Present'),
('A002', 'EMP002', '2024-10-01', 'Absent'),
('A003', 'EMP003', '2024-10-01', 'Present'),
('A004', 'EMP004', '2024-10-01', 'Present'),
('A005', 'EMP005', '2024-10-01', 'Present'),
('A006', 'EMP001', '2024-10-02', 'Present'),
('A007', 'EMP002', '2024-10-02', 'Present'),
('A008', 'EMP003', '2024-10-02', 'Leave'),
('A009', 'EMP004', '2024-10-02', 'Present'),
('A010', 'EMP005', '2024-10-02', 'Absent');

INSERT INTO leaverequest (`leave_id`, `start_date`, `end_date`, `description`, `request_status`, `employee_id`, `leave_type_id`) VALUES 
('LR001', '2024-10-01', '2024-10-01', 'Personal matters', 'Approved', 'EMP002', 'LT006'),
('LR002', '2024-10-02', '2024-10-04', 'Family vacation', 'Rejected', 'EMP003', 'LT003'),
('LR003', '2024-10-02', '2024-10-02', 'Sick leave', 'Approved', 'EMP003', 'LT003'),
('LR004', '2024-10-02', '2024-10-04', 'Family emergency', 'Approved', 'EMP005', 'LT007'),
('LR005', '2024-10-10', '2025-01-08', 'Maternity leave', 'Pending', 'EMP002', 'LT010');

INSERT INTO user (user_id, username, password_hash, role, employee_id) VALUES
('USR001', 'jperera', '5f4dcc3b5aa765d61d8327deb882cf99', 'Admin', 'EMP001'),
('USR002', 'afernando', '5f4dcc3b5aa765d61d8327deb882cf99', 'HR Manager', 'EMP002'),
('USR003', 'nwijesinghe', '5f4dcc3b5aa765d61d8327deb882cf99', 'Supervisor', 'EMP003'), 
('USR004', 'kdesilva', '5f4dcc3b5aa765d61d8327deb882cf99', 'Employee', 'EMP004'), 
('USR005', 'sratnayake', '5f4dcc3b5aa765d61d8327deb882cf99', 'Supervisor', 'EMP005');

INSERT INTO notifications (notification_id, user_id, message, date) VALUES
('NOT001', 'USR001', 'Your leave request has been approved.', '2024-09-01'),
('NOT002', 'USR002', 'Your performance review is scheduled for next week.', '2024-09-10'),
('NOT003', 'USR003', 'Please update your emergency contact information.', '2024-09-15'),
('NOT004', 'USR004', 'Reminder: Submit your quarterly report by Friday.', '2024-09-20'),
('NOT005', 'USR005', 'Your profile has been updated successfully.', '2024-09-25'), 
('NOT006', 'USR001', 'You have a new message from HR.', '2024-10-01'), 
('NOT007', 'USR002', 'Your annual bonus will be processed next month.', '2024-10-02'),
('NOT008', 'USR003', 'Training session on workplace safety scheduled.', '2024-10-03'),
('NOT009', 'USR004', 'Your health insurance policy has been renewed.', '2024-10-03'),
('NOT010', 'USR005', 'New company policies have been uploaded to the portal.', '2024-10-03');


INSERT INTO todolist (todo_id, user_id, task, due_date, status) VALUES
('TODO001', 'USR001', 'Complete quarterly financial report', '2024-10-05', 0), 
('TODO002', 'USR002', 'Schedule interviews for new hires', '2024-10-07', 1), 
('TODO003', 'USR003', 'Review team performance evaluations', '2024-10-10', 0), 
('TODO004', 'USR004', 'Prepare monthly project update', '2024-10-08', 0),
('TODO005', 'USR005', 'Update training materials', '2024-10-06', 1),
('TODO006', 'USR002', 'Organize employee feedback session', '2024-10-12', 0),
('TODO007', 'USR003', 'Approve leave requests for team', '2024-10-14', 1),
('TODO008', 'USR005', 'Conduct safety training', '2024-10-16', 0);
