-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: hrms
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` varchar(50) NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` enum('Present','Absent','Leave') DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES ('A001','EMP001','2024-10-01','Present'),('A002','EMP002','2024-10-01','Absent'),('A003','EMP003','2024-10-01','Present'),('A004','EMP004','2024-10-01','Present'),('A005','EMP005','2024-10-01','Present'),('A006','EMP001','2024-10-02','Present'),('A007','EMP002','2024-10-02','Present'),('A008','EMP003','2024-10-02','Leave'),('A009','EMP004','2024-10-02','Present'),('A010','EMP005','2024-10-02','Absent');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` varchar(50) NOT NULL,
  `branch_name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('BR001','Head Office - Sri Lanka','No. 123, Union Place, Colombo 02, Sri Lanka'),('BR002','Bangladesh Branch','House 20, Road 15, Gulshan 1, Dhaka, Bangladesh'),('BR003','Pakistan Branch','Plot #15, Block A, Industrial Area, Karachi, Pakistan');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customattribute`

DROP TABLE IF EXISTS `customattribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customattribute` (
  `employee_id` varchar(50) NOT NULL,
  `key_1` varchar(50) DEFAULT NULL,
  `value_1` varchar(50) DEFAULT NULL,
  `key_2` varchar(50) DEFAULT NULL,
  `value_2` varchar(50) DEFAULT NULL,
  `key_3` varchar(50) DEFAULT NULL,
  `value_3` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  CONSTRAINT `customattribute_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customattribute`
--

LOCK TABLES `customattribute` WRITE;
/*!40000 ALTER TABLE `customattribute` DISABLE KEYS */;
INSERT INTO `customattribute` VALUES ('EMP001','Blood Group','O+','Hobbies','Photography','Language Skills','English, Sinhala'),('EMP002','Blood Group','A-','Hobbies','Reading','Language Skills','English, Sinhala'),('EMP003','Blood Group','B+','Hobbies','Cycling','Language Skills','English, Sinhala, Tamil'),('EMP004','Blood Group','AB+','Hobbies','Cooking','Language Skills','English, Sinhala'),('EMP005','Blood Group','O-','Hobbies','Travelling','Language Skills','English, Sinhala');
/*!40000 ALTER TABLE `customattribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` varchar(50) NOT NULL,
  `department_name` varchar(50) DEFAULT NULL,
  `organization_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('DPT001','Human Resources','001'),('DPT002','Finance','001'),('DPT003','Information Technology','001'),('DPT004','Sales','001'),('DPT005','Marketing','001'),('DPT006','Production','001'),('DPT007','Quality Assurance','001'),('DPT008','Customer Service','001'),('DPT009','Supply Chain','001'),('DPT010','Research and Development','001');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `department_employee_count`
--

DROP TABLE IF EXISTS `department_employee_count`;
/*!50001 DROP VIEW IF EXISTS `department_employee_count`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `department_employee_count` AS SELECT 
 1 AS `department_name`,
 1 AS `employee_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `emergencyperson`
--

DROP TABLE IF EXISTS `emergencyperson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergencyperson` (
  `person_id` varchar(50) NOT NULL,
  `person_name` varchar(50) DEFAULT NULL,
  `relationship` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `emergencyperson_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencyperson`
--

LOCK TABLES `emergencyperson` WRITE;
/*!40000 ALTER TABLE `emergencyperson` DISABLE KEYS */;
INSERT INTO `emergencyperson` VALUES ('P001','Mala Perera','Wife','No. 25, Union Place, Colombo','EMP001'),('P002','Kasun Fernando','Brother','No. 18, Galle Road, Mount Lavinia','EMP002'),('P003','Sanduni Wijesinghe','Wife','No. 12, Kandy Road, Kandy','EMP003'),('P004','Nadeeka De Silva','Sister','No. 78, Negombo Road, Negombo','EMP004'),('P005','Lakmini Ratnayake','Wife','No. 33, Highlevel Road, Maharagama','EMP005');
/*!40000 ALTER TABLE `emergencyperson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergencypersoncontact`
--

DROP TABLE IF EXISTS `emergencypersoncontact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergencypersoncontact` (
  `phone_num` varchar(50) NOT NULL,
  `person_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`phone_num`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `emergencypersoncontact_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `emergencyperson` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencypersoncontact`
--

LOCK TABLES `emergencypersoncontact` WRITE;
/*!40000 ALTER TABLE `emergencypersoncontact` DISABLE KEYS */;
INSERT INTO `emergencypersoncontact` VALUES ('0771234567','P001'),('0762345678','P002'),('0713456789','P003'),('0722233445','P004'),('0753344556','P005');
/*!40000 ALTER TABLE `emergencypersoncontact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` varchar(50) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `marital_status` varchar(50) DEFAULT NULL,
  `NIC_number` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `status` enum('Intern parttime','Intern fultime','Contract parttime','Contract fultime','Permanent','Freelance') DEFAULT NULL,
  `job_title_id` varchar(50) DEFAULT NULL,
  `pay_grade_id` varchar(50) DEFAULT NULL,
  `supervisor_id` varchar(50) DEFAULT NULL,
  `department_id` varchar(50) DEFAULT NULL,
  `profile_pic` varchar(50) DEFAULT NULL,
  `branch_id` varchar(50) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `job_title_id` (`job_title_id`),
  KEY `pay_grade_id` (`pay_grade_id`),
  KEY `supervisor_id` (`supervisor_id`),
  KEY `department_id` (`department_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`job_title_id`) REFERENCES `jobtitle` (`job_title_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`pay_grade_id`) REFERENCES `paygrade` (`pay_grade_id`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('EMP001','John','Perera','1985-08-15','Married','NIC001','No. 25, Union Place, Colombo',NULL,'JT001','PG003',NULL,'DPT001','profile_john.jpg','BR001','male'),('EMP002','Amaya','Fernando','1990-05-21','Single','NIC002','No. 18, Galle Road, Mount Lavinia',NULL,'JT002','PG002','EMP001','DPT002','profile_amaya.jpg','BR001','female'),('EMP003','Nuwan','Wijesinghe','1988-12-10','Married','NIC003','No. 12, Kandy Road, Kandy',NULL,'JT003','PG003','EMP001','DPT003','profile_nuwan.jpg','BR001','male'),('EMP004','Kumari','De Silva','1992-04-12','Single','NIC004','No. 78, Negombo Road, Negombo','Contract parttime','JT004','PG003','EMP001','DPT007','profile_kumari.jpg','BR001','female'),('EMP005','Saman','Ratnayake','1987-11-05','Married','NIC005','No. 33, Highlevel Road, Maharagama',NULL,'JT005','PG003','EMP001','DPT004','profile_saman.jpg','BR001','male'),('EMP006','Tharusha','Galappaththi','1985-12-07','Married','NIC006','No. 77/1, Anandarama Road, Maharagama','Intern fultime','JT003','PG002','EMP001','DPT003','profile_tharusha.jpg','BR001','male'),('EMP007','Kasun','Kumaranayake','1990-08-17','Single','NIC007','No. 563, Yatiyana Road, Matara','Permanent','JT005','PG002','EMP001','DPT002','profile_kasun.jpg','BR001','male'),('EMP008','Sajitha','Gallage','1992-10-12','Married','NIC008','No. 28/C, Galle Road, Ambepitiya','Freelance','JT004','PG003','EMP001','DPT004','profile_sajitha.jpg','BR001','male');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `haddle_new_employee` AFTER INSERT ON `employee` FOR EACH ROW BEGIN
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
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `employee_emergency_contact`
--

DROP TABLE IF EXISTS `employee_emergency_contact`;
/*!50001 DROP VIEW IF EXISTS `employee_emergency_contact`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `employee_emergency_contact` AS SELECT 
 1 AS `employee_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `person_name`,
 1 AS `phone_num`,
 1 AS `relationship`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `employeecontact`
--

DROP TABLE IF EXISTS `employeecontact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeecontact` (
  `phone_num` varchar(50) NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`phone_num`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employeecontact_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeecontact`
--

LOCK TABLES `employeecontact` WRITE;
/*!40000 ALTER TABLE `employeecontact` DISABLE KEYS */;
INSERT INTO `employeecontact` VALUES ('0771122334','EMP001'),('0762233445','EMP002'),('0713344556','EMP003'),('0724455667','EMP004'),('0755566778','EMP005');
/*!40000 ALTER TABLE `employeecontact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeedependents`
--

DROP TABLE IF EXISTS `employeedependents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeedependents` (
  `dependent_id` varchar(50) NOT NULL,
  `dependent_name` varchar(50) DEFAULT NULL,
  `relationship` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `is_covered_by_insurance` tinyint(1) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dependent_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employeedependents_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeedependents`
--

LOCK TABLES `employeedependents` WRITE;
/*!40000 ALTER TABLE `employeedependents` DISABLE KEYS */;
INSERT INTO `employeedependents` VALUES ('ED001','Mala Perera','Wife','female',1,'EMP001'),('ED002','Kasun Perera','Son','male',0,'EMP001'),('ED003','Sanduni Wijesinghe','Wife','female',0,'EMP003'),('ED004','Sithmini Wijesinghe','Daughter','female',0,'EMP003'),('ED005','Rumesh De Silva','Father','male',0,'EMP004'),('ED006','Lakmini Ratnayake','Wife','female',1,'EMP005'),('ED007','Sriyani Ratnayake','Mother','female',1,'EMP005');
/*!40000 ALTER TABLE `employeedependents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `employeedetails`
--

DROP TABLE IF EXISTS `employeedetails`;
/*!50001 DROP VIEW IF EXISTS `employeedetails`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `employeedetails` AS SELECT 
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `job_title_name`,
 1 AS `department_name`,
 1 AS `branch_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `jobtitle`
--

DROP TABLE IF EXISTS `jobtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobtitle` (
  `job_title_id` varchar(50) NOT NULL,
  `job_title_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`job_title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobtitle`
--

LOCK TABLES `jobtitle` WRITE;
/*!40000 ALTER TABLE `jobtitle` DISABLE KEYS */;
INSERT INTO `jobtitle` VALUES ('JT001','HR Manager'),('JT002','Accountant'),('JT003','Software Engineer'),('JT004','QA Engineer'),('JT005','Sales Manager'),('JT006','Production Supervisor'),('JT007','Marketing Executive'),('JT008','IT Support Specialist'),('JT009','Customer Service Representative'),('JT010','Supply Chain Manager');
/*!40000 ALTER TABLE `jobtitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `leave_requests_info`
--

DROP TABLE IF EXISTS `leave_requests_info`;
/*!50001 DROP VIEW IF EXISTS `leave_requests_info`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `leave_requests_info` AS SELECT 
 1 AS `leave_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `type_name`,
 1 AS `start_date`,
 1 AS `end_date`,
 1 AS `description`,
 1 AS `leave_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `leavecount`
--

DROP TABLE IF EXISTS `leavecount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leavecount` (
  `employee_id` varchar(50) DEFAULT NULL,
  `leave_type_id` varchar(50) DEFAULT NULL,
  `rem_leave_count` int DEFAULT NULL,
  KEY `employee_id` (`employee_id`),
  KEY `leave_type_id` (`leave_type_id`),
  CONSTRAINT `leavecount_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `leavecount_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leavetype` (`leave_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leavecount`
--

LOCK TABLES `leavecount` WRITE;
/*!40000 ALTER TABLE `leavecount` DISABLE KEYS */;
INSERT INTO `leavecount` VALUES ('EMP001','LT003',16),('EMP001','LT007',24),('EMP001','LT013',50),('EMP002','LT002',14),('EMP002','LT006',22),('EMP002','LT010',90),('EMP002','LT013',50),('EMP003','LT003',16),('EMP003','LT007',24),('EMP003','LT013',50),('EMP004','LT003',16),('EMP004','LT007',24),('EMP004','LT011',100),('EMP004','LT013',50),('EMP005','LT003',16),('EMP005','LT007',24),('EMP005','LT013',50),('EMP006','LT002',14),('EMP006','LT006',22),('EMP006','LT013',50),('EMP007','LT002',14),('EMP007','LT006',22),('EMP007','LT013',50),('EMP008','LT003',16),('EMP008','LT007',24),('EMP008','LT013',50);
/*!40000 ALTER TABLE `leavecount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaverequest`
--

DROP TABLE IF EXISTS `leaverequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequest` (
  `leave_id` varchar(50) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `request_status` enum('Pending','Approved','Rejected') DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `leave_type_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`leave_id`),
  KEY `employee_id` (`employee_id`),
  KEY `leave_type_id` (`leave_type_id`),
  CONSTRAINT `leaverequest_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `leaverequest_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leavetype` (`leave_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequest`
--

LOCK TABLES `leaverequest` WRITE;
/*!40000 ALTER TABLE `leaverequest` DISABLE KEYS */;
INSERT INTO `leaverequest` VALUES ('LR001','2024-10-01','2024-10-01','Personal matters','Approved','EMP002','LT006'),('LR002','2024-10-02','2024-10-04','Family vacation','Rejected','EMP003','LT003'),('LR003','2024-10-02','2024-10-02','Sick leave','Approved','EMP003','LT003'),('LR004','2024-10-02','2024-10-04','Family emergency','Approved','EMP005','LT007'),('LR005','2024-10-10','2025-01-08','Maternity leave','Pending','EMP002','LT010');
/*!40000 ALTER TABLE `leaverequest` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_leave_count` AFTER UPDATE ON `leaverequest` FOR EACH ROW BEGIN
    IF NEW.request_status = 'Approved' THEN
        UPDATE leavecount
        SET rem_leave_count = rem_leave_count - (DATEDIFF(NEW.end_date, NEW.start_date) + 1)
        WHERE employee_id = NEW.employee_id 
        AND leave_type_id = NEW.leave_type_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `leavetype`
--

DROP TABLE IF EXISTS `leavetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leavetype` (
  `leave_type_id` varchar(50) NOT NULL,
  `type_name` enum('Casual Leave','Annual Leave','Maternity Leave','No Pay') DEFAULT NULL,
  `default_days` int DEFAULT NULL,
  `pay_grade_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`leave_type_id`),
  KEY `pay_grade_id` (`pay_grade_id`),
  CONSTRAINT `leavetype_ibfk_1` FOREIGN KEY (`pay_grade_id`) REFERENCES `paygrade` (`pay_grade_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leavetype`
--

LOCK TABLES `leavetype` WRITE;
/*!40000 ALTER TABLE `leavetype` DISABLE KEYS */;
INSERT INTO `leavetype` VALUES ('LT001','Casual Leave',12,'PG001'),('LT002','Casual Leave',14,'PG002'),('LT003','Casual Leave',16,'PG003'),('LT004','Casual Leave',18,'PG004'),('LT005','Annual Leave',20,'PG001'),('LT006','Annual Leave',22,'PG002'),('LT007','Annual Leave',24,'PG003'),('LT008','Annual Leave',26,'PG004'),('LT009','Maternity Leave',90,'PG001'),('LT010','Maternity Leave',90,'PG002'),('LT011','Maternity Leave',100,'PG003'),('LT012','Maternity Leave',100,'PG004'),('LT013','No Pay',50,NULL);
/*!40000 ALTER TABLE `leavetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('NOT001','USR001','Your leave request has been approved.','2024-09-01'),('NOT002','USR002','Your performance review is scheduled for next week.','2024-09-10'),('NOT003','USR003','Please update your emergency contact information.','2024-09-15'),('NOT004','USR004','Reminder: Submit your quarterly report by Friday.','2024-09-20'),('NOT005','USR005','Your profile has been updated successfully.','2024-09-25'),('NOT006','USR001','You have a new message from HR.','2024-10-01'),('NOT007','USR002','Your annual bonus will be processed next month.','2024-10-02'),('NOT008','USR003','Training session on workplace safety scheduled.','2024-10-03'),('NOT009','USR004','Your health insurance policy has been renewed.','2024-10-03'),('NOT010','USR005','New company policies have been uploaded to the portal.','2024-10-03');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `organization_id` varchar(50) NOT NULL,
  `organization_name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `latitude` decimal(10,0) DEFAULT NULL,
  `longitude` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`organization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES ('001','Jupiter Apparels','No. 123, Galle Road, Colombo, Sri Lanka','BR123456789',7,80);
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paygrade`
--

DROP TABLE IF EXISTS `paygrade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paygrade` (
  `pay_grade_id` varchar(50) NOT NULL,
  `grade` enum('Level1','Level2','Level3','Level4') DEFAULT NULL,
  PRIMARY KEY (`pay_grade_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paygrade`
--

LOCK TABLES `paygrade` WRITE;
/*!40000 ALTER TABLE `paygrade` DISABLE KEYS */;
INSERT INTO `paygrade` VALUES ('PG001','Level1'),('PG002','Level2'),('PG003','Level3'),('PG004','Level4');
/*!40000 ALTER TABLE `paygrade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `rem_leave_count`
--

DROP TABLE IF EXISTS `rem_leave_count`;
/*!50001 DROP VIEW IF EXISTS `rem_leave_count`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rem_leave_count` AS SELECT 
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `type_name`,
 1 AS `rem_leave_count`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `todolist`
--

DROP TABLE IF EXISTS `todolist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todolist` (
  `todo_id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `task` varchar(255) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `todolist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todolist`
--

LOCK TABLES `todolist` WRITE;
/*!40000 ALTER TABLE `todolist` DISABLE KEYS */;
INSERT INTO `todolist` VALUES ('TODO001','USR001','Complete quarterly financial report','2024-10-05',0),('TODO002','USR002','Schedule interviews for new hires','2024-10-07',1),('TODO003','USR003','Review team performance evaluations','2024-10-10',0),('TODO004','USR004','Prepare monthly project update','2024-10-08',0),('TODO005','USR005','Update training materials','2024-10-06',1),('TODO006','USR002','Organize employee feedback session','2024-10-12',0),('TODO007','USR003','Approve leave requests for team','2024-10-14',1),('TODO008','USR005','Conduct safety training','2024-10-16',0);
/*!40000 ALTER TABLE `todolist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` enum('Admin','HR Manager','Employee','Supervisor') DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('USR001','jperera','5f4dcc3b5aa765d61d8327deb882cf99','Admin','EMP001'),('USR002','afernando','5f4dcc3b5aa765d61d8327deb882cf99','HR Manager','EMP002'),('USR003','nwijesinghe','5f4dcc3b5aa765d61d8327deb882cf99','Supervisor','EMP003'),('USR004','kdesilva','5f4dcc3b5aa765d61d8327deb882cf99','Employee','EMP004'),('USR005','sratnayake','5f4dcc3b5aa765d61d8327deb882cf99','Supervisor','EMP005');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!50001 DROP VIEW IF EXISTS `user_info`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_info` AS SELECT 
 1 AS `user_id`,
 1 AS `username`,
 1 AS `role`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `nic_number`,
 1 AS `birth_date`,
 1 AS `marital_status`,
 1 AS `employee_address`,
 1 AS `employment_status`,
 1 AS `gender`,
 1 AS `job_title_name`,
 1 AS `department_name`,
 1 AS `branch_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `department_employee_count`
--

/*!50001 DROP VIEW IF EXISTS `department_employee_count`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `department_employee_count` AS select `d`.`department_name` AS `department_name`,count(`e`.`employee_id`) AS `employee_count` from (`department` `d` left join `employee` `e` on((`d`.`department_id` = `e`.`department_id`))) group by `d`.`department_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employee_emergency_contact`
--

/*!50001 DROP VIEW IF EXISTS `employee_emergency_contact`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_emergency_contact` AS select `e`.`employee_id` AS `employee_id`,`e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name`,`ep`.`person_name` AS `person_name`,`epc`.`phone_num` AS `phone_num`,`ep`.`relationship` AS `relationship` from ((`employee` `e` join `emergencyperson` `ep` on((`e`.`employee_id` = `ep`.`employee_id`))) join `emergencypersoncontact` `epc` on((`ep`.`person_id` = `epc`.`person_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employeedetails`
--

/*!50001 DROP VIEW IF EXISTS `employeedetails`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employeedetails` AS select `e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name`,`j`.`job_title_name` AS `job_title_name`,`d`.`department_name` AS `department_name`,`b`.`branch_name` AS `branch_name` from (((`employee` `e` join `jobtitle` `j` on((`e`.`job_title_id` = `j`.`job_title_id`))) join `department` `d` on((`e`.`department_id` = `d`.`department_id`))) join `branch` `b` on((`e`.`branch_id` = `b`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `leave_requests_info`
--

/*!50001 DROP VIEW IF EXISTS `leave_requests_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `leave_requests_info` AS select `lr`.`leave_id` AS `leave_id`,`e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name`,`lt`.`type_name` AS `type_name`,`lr`.`start_date` AS `start_date`,`lr`.`end_date` AS `end_date`,`lr`.`description` AS `description`,`lr`.`request_status` AS `leave_status` from ((`leaverequest` `lr` join `employee` `e` on((`lr`.`employee_id` = `e`.`employee_id`))) join `leavetype` `lt` on((`lr`.`leave_type_id` = `lt`.`leave_type_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `rem_leave_count`
--

/*!50001 DROP VIEW IF EXISTS `rem_leave_count`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `rem_leave_count` AS select `e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name`,`lt`.`type_name` AS `type_name`,`lc`.`rem_leave_count` AS `rem_leave_count` from ((`employee` `e` join `leavecount` `lc` on((`e`.`employee_id` = `lc`.`employee_id`))) join `leavetype` `lt` on((`lc`.`leave_type_id` = `lt`.`leave_type_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_info`
--

/*!50001 DROP VIEW IF EXISTS `user_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_info` AS select `u`.`user_id` AS `user_id`,`u`.`username` AS `username`,`u`.`role` AS `role`,`e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name`,`e`.`NIC_number` AS `nic_number`,`e`.`birth_date` AS `birth_date`,`e`.`marital_status` AS `marital_status`,`e`.`address` AS `employee_address`,`e`.`status` AS `employment_status`,`e`.`gender` AS `gender`,`j`.`job_title_name` AS `job_title_name`,`d`.`department_name` AS `department_name`,`b`.`branch_name` AS `branch_name` from ((((`user` `u` join `employee` `e` on((`u`.`employee_id` = `e`.`employee_id`))) join `jobtitle` `j` on((`e`.`job_title_id` = `j`.`job_title_id`))) join `department` `d` on((`e`.`department_id` = `d`.`department_id`))) join `branch` `b` on((`e`.`branch_id` = `b`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-15 19:10:39
