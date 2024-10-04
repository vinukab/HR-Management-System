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
    AND (gender = employee_gender OR gender IS NULL); 

    IF constraint_count > 0 THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END$$

DELIMITER $$

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

            INSERT INTO leavecount (employee_id, leave_type_id,rem_leave_count) 
            VALUES (NEW.employee_id, current_leave_type_id, current_default_days);
        END IF;
    END LOOP;

    CLOSE leave_type_cursor;
END$$

DELIMITER ;