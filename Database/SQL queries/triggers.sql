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

<<<<<<< HEAD:Database/SQL queries/functions and triggers.sql
DELIMITER ;



create procedure ProcessLeaveCount (
	in p_leave_id VARCHAR(50),
    in p_new_status ENUM('Pending', 'Approved', 'Rejected')
)
begin
	update leaverequest
    set request_status = p_new_status
    where leave_id = p_leave_id;
    
    if p_new_status = 'Approved' then
		declare leave_days int
		set leave_days = datediff(
		    (select end_date from leaverequest where leave_id = p_leave_id),
		    (select start_date from leaverequest where leave_id = p_leave_id)
		) + 1;
		update leavecount
		set rem_leave_count = rem_leave_count - leave_days
		where employee_id = (select employee_id from leaverequest where leave_id = p_leave_id)
			  and leave_type_id = (select leave_type_id from leaverequest where leave_id = p_leave_id);
    end if;
end;

=======

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
>>>>>>> 82ac09bbdc0a766e0950e7b9f1fbfd29f99df163:Database/SQL queries/triggers.sql
