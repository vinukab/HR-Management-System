
INSERT INTO organization (organization_id, organization_name, address, registration_number, latitude, longitude)
VALUES 
('001', 'Jupiter Apparels', 'No. 123, Galle Road, Colombo, Sri Lanka', 'BR123456789', 6.927079, 79.861244);


INSERT INTO paygrade (pay_grade_id, grade)
VALUES 
('PG001', 'Junior'),
('PG002', 'Mid'),
('PG003', 'Senior'),
('PG004', 'Lead'),
('PG005', 'Junior'),
('PG006', 'Mid'),
('PG007', 'Senior'),
('PG008', 'Lead'),
('PG009', 'Junior'),
('PG010', 'Senior');

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

INSERT INTO leavetype (`leave_type_id`, `type_name`, `default_days`, `pay_grade_id`, `gender`) VALUES 
('LT001', 'Sick Leave1', '10', 'PG001', null),
('LT002', 'Sick Leave2', '12', 'PG002',null),
('LT003', 'Sick Leave3', '14', 'PG003', null),
('LT004', 'Sick Leave4', '14', 'PG004', null),
('LT005', 'Casual Leave1', '12', 'PG001', null),
('LT006', 'Casual Leave2', '14', 'PG002', null),
('LT007', 'Casual Leave3', '16', 'PG003', null),
('LT008', 'Casual Leave4', '18', 'PG004', null),
('LT009', 'Maternity Leave1', '90', 'PG001', 'female'),
('LT010', 'Maternity Leave2', '90', 'PG002', 'female'),
('LT011', 'Maternity Leave3', '100', 'PG003', 'female'),
('LT012', 'Maternity Leave4', '100', 'PG004', 'female');

INSERT INTO employee (employee_id, first_name, last_name, birth_date, marital_status, NIC_number, address, status, job_title_id, pay_grade_id, supervisor_id, department_id, profile_pic, branch_id, gender)
VALUES
('EMP001', 'John', 'Perera', '1985-08-15', 'Married', 'NIC001', 'No. 25, Union Place, Colombo', 'Active', 'JT001', 'PG003', NULL, 'DPT001', 'profile_john.jpg', 'BR001', 'male'),
('EMP002', 'Amaya', 'Fernando', '1990-05-21', 'Single', 'NIC002', 'No. 18, Galle Road, Mount Lavinia', 'Active', 'JT002', 'PG002', 'EMP001', 'DPT002', 'profile_amaya.jpg', 'BR001', 'female'),
('EMP003', 'Nuwan', 'Wijesinghe', '1988-12-10', 'Married', 'NIC003', 'No. 12, Kandy Road, Kandy', 'Active', 'JT003', 'PG003', 'EMP001', 'DPT003', 'profile_nuwan.jpg', 'BR001', 'male'),
('EMP004', 'Kumari', 'De Silva', '1992-04-12', 'Single', 'NIC004', 'No. 78, Negombo Road, Negombo', 'Active', 'JT004', 'PG002', 'EMP001', 'DPT007', 'profile_kumari.jpg', 'BR001', 'female'),
('EMP005', 'Saman', 'Ratnayake', '1987-11-05', 'Married', 'NIC005', 'No. 33, Highlevel Road, Maharagama', 'Active', 'JT005', 'PG003', 'EMP001', 'DPT004', 'profile_saman.jpg', 'BR001', 'male');

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
