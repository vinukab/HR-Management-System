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


CREATE TRIGGER update_leave_count
AFTER UPDATE ON leaverequest
FOR EACH ROW
BEGIN
    IF NEW.request_status = 'Approved' THEN
        UPDATE leavecount
        SET rem_leave_count = rem_leave_count - (DATEDIFF(NEW.end_date, NEW.start_date)+1)
        WHERE employee_id = NEW.employee_id 
        AND leave_type_id = NEW.leave_type_id;
    END IF;
END$$

DELIMITER ;
