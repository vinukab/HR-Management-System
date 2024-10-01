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
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
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
INSERT INTO `branch` VALUES ('d0193061-7376-11ef-abe1-089798ed344a','Main Branch','123 Main St'),('d019d45f-7376-11ef-abe1-089798ed344a','Secondary Branch','456 Secondary St'),('d01a814c-7376-11ef-abe1-089798ed344a','Tertiary Branch','789 Tertiary St'),('d01b0d95-7376-11ef-abe1-089798ed344a','North Branch','101 North St'),('d01bbe2f-7376-11ef-abe1-089798ed344a','South Branch','202 South St'),('d01c4cb6-7376-11ef-abe1-089798ed344a','East Branch','303 East St'),('d01cd7d7-7376-11ef-abe1-089798ed344a','West Branch','404 West St'),('d01d6be2-7376-11ef-abe1-089798ed344a','Central Branch','505 Central St'),('d01df71e-7376-11ef-abe1-089798ed344a','Regional Branch','606 Regional St'),('d01e88a9-7376-11ef-abe1-089798ed344a','Local Branch','707 Local St');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customattribute`
--

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
  CONSTRAINT `customattribute_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customattribute`
--

LOCK TABLES `customattribute` WRITE;
/*!40000 ALTER TABLE `customattribute` DISABLE KEYS */;
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
  `name` varchar(50) DEFAULT NULL,
  `organization_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('ee3224d0-737d-11ef-abe1-089798ed344a','IT Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3962cd-737d-11ef-abe1-089798ed344a','HR Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3a0ffa-737d-11ef-abe1-089798ed344a','Finance Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3ab61b-737d-11ef-abe1-089798ed344a','Marketing Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3b5d90-737d-11ef-abe1-089798ed344a','Sales Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3bf741-737d-11ef-abe1-089798ed344a','Operations Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3c9018-737d-11ef-abe1-089798ed344a','Customer Service','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3d1a9e-737d-11ef-abe1-089798ed344a','Product Development','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3db995-737d-11ef-abe1-089798ed344a','Legal Department','d015b16d-7376-11ef-abe1-089798ed344a'),('ee3e4c10-737d-11ef-abe1-089798ed344a','R&D Department','d015b16d-7376-11ef-abe1-089798ed344a');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergencyperson`
--

DROP TABLE IF EXISTS `emergencyperson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergencyperson` (
  `person_id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `relationship` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `emergencyperson_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencyperson`
--

LOCK TABLES `emergencyperson` WRITE;
/*!40000 ALTER TABLE `emergencyperson` DISABLE KEYS */;
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
  CONSTRAINT `emergencypersoncontact_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `emergencyperson` (`person_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencypersoncontact`
--

LOCK TABLES `emergencypersoncontact` WRITE;
/*!40000 ALTER TABLE `emergencypersoncontact` DISABLE KEYS */;
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
  `status` enum('Active','Inactive') DEFAULT NULL,
  `job_title_id` varchar(50) DEFAULT NULL,
  `pay_grade_id` varchar(50) DEFAULT NULL,
  `supervisor_id` varchar(50) DEFAULT NULL,
  `department_id` varchar(50) DEFAULT NULL,
  `profile_pic` varchar(50) DEFAULT NULL,
  `branch_id` varchar(50) DEFAULT NULL,
  `gender_type_id` varchar(50) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `supervisor_id` (`supervisor_id`),
  KEY `pay_grade_id` (`pay_grade_id`),
  KEY `branch_id` (`branch_id`),
  KEY `job_title_id` (`job_title_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`employee_id`) ON DELETE SET NULL,
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`pay_grade_id`) REFERENCES `paygrade` (`pay_grade_id`) ON DELETE SET NULL,
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL,
  CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`job_title_id`) REFERENCES `jobtitle` (`job_title_id`) ON DELETE SET NULL,
  CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('67854526-8146-46c5-b22f-edbdce216f33','thimira','sahan','2024-09-05','single','2002298928','no 168 badalgama road makandura gowill','Inactive','d01f52ea-7376-11ef-abe1-089798ed344a','d0168883-7376-11ef-abe1-089798ed344a',NULL,'ee3224d0-737d-11ef-abe1-089798ed344a',NULL,'d0193061-7376-11ef-abe1-089798ed344a','2',NULL),('a615c167-b623-4ccd-a989-9a49a764ec9f','anura','ranil','2024-09-06','married','ffhfhf','dhdhddhddh','Active','d01f52ea-7376-11ef-abe1-089798ed344a','d0168883-7376-11ef-abe1-089798ed344a',NULL,'ee3224d0-737d-11ef-abe1-089798ed344a','/uploads/219b2334-5782-49ef-bc42-540d58f7f96a.webp','d0193061-7376-11ef-abe1-089798ed344a','2',NULL),('b51fb223-1eed-4ab7-ac49-bfc09520cb9b','thimirajvnkf','sahankjcv','2024-09-06','married','ffhfhf','dhdhddhddh','Active','d01f52ea-7376-11ef-abe1-089798ed344a','d0168883-7376-11ef-abe1-089798ed344a',NULL,'ee3224d0-737d-11ef-abe1-089798ed344a',NULL,'d0193061-7376-11ef-abe1-089798ed344a','2',NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `employeecontact_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeecontact`
--

LOCK TABLES `employeecontact` WRITE;
/*!40000 ALTER TABLE `employeecontact` DISABLE KEYS */;
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
  CONSTRAINT `employeedependents_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeedependents`
--

LOCK TABLES `employeedependents` WRITE;
/*!40000 ALTER TABLE `employeedependents` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeedependents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gendertype`
--

DROP TABLE IF EXISTS `gendertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gendertype` (
  `gender_type_id` varchar(50) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`gender_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gendertype`
--

LOCK TABLES `gendertype` WRITE;
/*!40000 ALTER TABLE `gendertype` DISABLE KEYS */;
INSERT INTO `gendertype` VALUES ('1','Male'),('10','Cisgender'),('11','Pangender'),('12','Demiboy'),('13','Demigirl'),('14','Intersex'),('15','Other'),('2','Female'),('3','Non-binary'),('4','Genderqueer'),('5','Agender'),('6','Bigender'),('7','Genderfluid'),('8','Two-Spirit'),('9','Transgender');
/*!40000 ALTER TABLE `gendertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobtitle`
--

DROP TABLE IF EXISTS `jobtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobtitle` (
  `job_title_id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `leave_count` int DEFAULT NULL,
  PRIMARY KEY (`job_title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobtitle`
--

LOCK TABLES `jobtitle` WRITE;
/*!40000 ALTER TABLE `jobtitle` DISABLE KEYS */;
INSERT INTO `jobtitle` VALUES ('d01f52ea-7376-11ef-abe1-089798ed344a','Software Engineer',20),('d02011bc-7376-11ef-abe1-089798ed344a','HR Manager',25),('d020d5a8-7376-11ef-abe1-089798ed344a','Product Manager',30),('d02163f7-7376-11ef-abe1-089798ed344a','Business Analyst',15),('d021fb42-7376-11ef-abe1-089798ed344a','System Admin',10),('d02292b2-7376-11ef-abe1-089798ed344a','UX Designer',18),('d02330ef-7376-11ef-abe1-089798ed344a','Marketing Specialist',22),('d023cd47-7376-11ef-abe1-089798ed344a','Sales Executive',12),('d0246a7b-7376-11ef-abe1-089798ed344a','Data Scientist',20),('d0250b68-7376-11ef-abe1-089798ed344a','IT Support',16);
/*!40000 ALTER TABLE `jobtitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_log`
--

DROP TABLE IF EXISTS `leave_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=202050 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_log`
--

LOCK TABLES `leave_log` WRITE;
/*!40000 ALTER TABLE `leave_log` DISABLE KEYS */;
INSERT INTO `leave_log` VALUES (1,NULL,'2024-09-23 14:28:26'),(2,NULL,'2024-09-23 14:28:26'),(3,NULL,'2024-09-23 14:28:26'),(4,NULL,'2024-09-23 14:33:05'),(5,NULL,'2024-09-23 14:33:05'),(6,NULL,'2024-09-23 14:33:05'),(7,NULL,'2024-09-23 14:49:18'),(8,NULL,'2024-09-23 14:49:18'),(9,NULL,'2024-09-23 14:49:18'),(10,'hi','2024-09-23 15:08:12'),(11,'hi','2024-09-23 15:08:12'),(12,'hi','2024-09-23 15:08:12'),(13,'d36e67d7-8124-4d79-86fd-2f9ef45f6f37','2024-09-23 15:10:37'),(14,'e9f239ea-9476-4037-b3e4-42f47b765b2a','2024-09-23 15:10:37'),(15,'f29cd295-6859-4c83-b83a-bffae9823790','2024-09-23 15:10:37'),(16,NULL,'2024-09-23 15:14:07'),(17,NULL,'2024-09-23 15:14:07'),(18,NULL,'2024-09-23 15:14:07'),(19,NULL,'2024-09-23 15:19:34'),(20,NULL,'2024-09-23 15:19:34'),(21,NULL,'2024-09-23 15:19:34'),(22,NULL,'2024-09-23 15:22:24'),(23,NULL,'2024-09-23 15:22:24'),(24,NULL,'2024-09-23 15:22:24'),(202029,NULL,'2024-09-23 15:35:01'),(202030,NULL,'2024-09-23 15:35:01'),(202031,NULL,'2024-09-23 15:35:01'),(202032,NULL,'2024-09-23 15:41:54'),(202033,NULL,'2024-09-23 15:41:54'),(202034,NULL,'2024-09-23 15:41:54'),(202035,NULL,'2024-09-23 15:45:45'),(202036,NULL,'2024-09-23 15:45:45'),(202037,NULL,'2024-09-23 15:45:45'),(202038,NULL,'2024-09-23 15:49:26'),(202039,NULL,'2024-09-23 15:49:26'),(202040,NULL,'2024-09-23 15:49:26'),(202041,'Leave type ID: d36e67d7-8124-4d79-86fd-2f9ef45f6f37, Default days: 10','2024-09-23 15:59:57'),(202042,'Leave type ID: e9f239ea-9476-4037-b3e4-42f47b765b2a, Default days: 7','2024-09-23 15:59:57'),(202043,'Leave type ID: f29cd295-6859-4c83-b83a-bffae9823790, Default days: 90','2024-09-23 15:59:57'),(202044,'Leave type ID: d36e67d7-8124-4d79-86fd-2f9ef45f6f37, Default days: 10','2024-09-23 16:05:16'),(202045,'Leave type ID: e9f239ea-9476-4037-b3e4-42f47b765b2a, Default days: 7','2024-09-23 16:05:16'),(202046,'Leave type ID: f29cd295-6859-4c83-b83a-bffae9823790, Default days: 90','2024-09-23 16:05:16'),(202047,'Leave type ID: d36e67d7-8124-4d79-86fd-2f9ef45f6f37, Default days: 10','2024-09-23 16:07:21'),(202048,'Leave type ID: e9f239ea-9476-4037-b3e4-42f47b765b2a, Default days: 7','2024-09-23 16:07:21'),(202049,'Leave type ID: f29cd295-6859-4c83-b83a-bffae9823790, Default days: 90','2024-09-23 16:07:21');
/*!40000 ALTER TABLE `leave_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leavecount`
--

DROP TABLE IF EXISTS `leavecount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leavecount` (
  `employee_id` varchar(50) NOT NULL,
  `leave_type_id` varchar(50) NOT NULL,
  `rem_leave_count` int DEFAULT NULL,
  KEY `leave_type_id` (`leave_type_id`),
  KEY `leavecount_ibfk_1` (`employee_id`),
  CONSTRAINT `leavecount_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `leavecount_ibfk_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leavetype` (`leave_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leavecount`
--

LOCK TABLES `leavecount` WRITE;
/*!40000 ALTER TABLE `leavecount` DISABLE KEYS */;
INSERT INTO `leavecount` VALUES ('67854526-8146-46c5-b22f-edbdce216f33','d36e67d7-8124-4d79-86fd-2f9ef45f6f37',9),('67854526-8146-46c5-b22f-edbdce216f33','f29cd295-6859-4c83-b83a-bffae9823790',89);
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
  `request_status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `employee_id` varchar(50) DEFAULT NULL,
  `leave_type_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`leave_id`),
  KEY `leave_type_id` (`leave_type_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `leaverequest_ibfk_1` FOREIGN KEY (`leave_type_id`) REFERENCES `leavetype` (`leave_type_id`) ON DELETE SET NULL,
  CONSTRAINT `leaverequest_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequest`
--

LOCK TABLES `leaverequest` WRITE;
/*!40000 ALTER TABLE `leaverequest` DISABLE KEYS */;
INSERT INTO `leaverequest` VALUES ('101','2024-09-25','2024-09-27','Medical appointment','Approved','a615c167-b623-4ccd-a989-9a49a764ec9f','d36e67d7-8124-4d79-86fd-2f9ef45f6f37'),('102','2024-10-10','2024-10-12','Personal reasons','Pending','a615c167-b623-4ccd-a989-9a49a764ec9f','e9f239ea-9476-4037-b3e4-42f47b765b2a'),('103','2024-12-01','2025-02-28','Maternity leave request','Pending','b51fb223-1eed-4ab7-ac49-bfc09520cb9b','f29cd295-6859-4c83-b83a-bffae9823790'),('31704fd6-7775-11ef-9b00-089798ed344a','2024-09-03','2024-09-24','hiiii','Pending',NULL,'e9f239ea-9476-4037-b3e4-42f47b765b2a'),('3416615a-77d9-11ef-9b00-089798ed344a','2024-09-11','2024-09-13','I need ','Pending',NULL,'f29cd295-6859-4c83-b83a-bffae9823790'),('59602e33-776e-11ef-9b00-089798ed344a','2024-09-11','2024-09-12','hi','Pending',NULL,'f29cd295-6859-4c83-b83a-bffae9823790'),('8b2d7434-77db-11ef-9b00-089798ed344a','2024-09-11','2024-09-13','I need ','Pending',NULL,'f29cd295-6859-4c83-b83a-bffae9823790'),('d3ee3e03-776d-11ef-9b00-089798ed344a','2024-09-11','2024-09-12','hi','Pending',NULL,'f29cd295-6859-4c83-b83a-bffae9823790');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `validate_leave_request` BEFORE INSERT ON `leaverequest` FOR EACH ROW BEGIN
    DECLARE countConstraints INT;
    
    SELECT COUNT(*)
    INTO countConstraints
    FROM leavetypeconstraint
    WHERE leave_type_id = NEW.leave_type_id
    AND (gender_type_id IS NULL OR gender_type_id = (SELECT gender_type_id FROM employee WHERE employee_id = NEW.employee_id))
    AND (job_title_id IS NULL OR job_title_id = (SELECT job_title_id FROM employee WHERE employee_id = NEW.employee_id))
    AND (pay_grade_id IS NULL OR pay_grade_id = (SELECT pay_grade_id FROM employee WHERE employee_id = NEW.employee_id))
    AND (department_id IS NULL OR department_id = (SELECT department_id FROM employee WHERE employee_id = NEW.employee_id))
    AND (branch_id IS NULL OR branch_id = (SELECT branch_id FROM employee WHERE employee_id = NEW.employee_id));

    -- If no valid constraints are found, raise an error to prevent the insert
    IF countConstraints = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Leave type is not valid based on the employee constraints.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `handle_leave_approval` AFTER UPDATE ON `leaverequest` FOR EACH ROW BEGIN
    IF (NEW.request_status = 'Approved') THEN
        UPDATE leavecount 
        SET rem_leave_count = rem_leave_count - 1 
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
-- Table structure for table `leaverequeststatusaudit`
--

DROP TABLE IF EXISTS `leaverequeststatusaudit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequeststatusaudit` (
  `audit_id` varchar(50) NOT NULL,
  `audit_date` date DEFAULT NULL,
  `action` enum('Created','Approved','Rejected','Cancelled') DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `leave_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `leaverequeststatusaudit_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequeststatusaudit`
--

LOCK TABLES `leaverequeststatusaudit` WRITE;
/*!40000 ALTER TABLE `leaverequeststatusaudit` DISABLE KEYS */;
/*!40000 ALTER TABLE `leaverequeststatusaudit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leavetype`
--

DROP TABLE IF EXISTS `leavetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leavetype` (
  `leave_type_id` varchar(50) NOT NULL,
  `type_name` varchar(50) DEFAULT NULL,
  `default_days` int DEFAULT NULL,
  `pay_grade_id` varchar(50) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  PRIMARY KEY (`leave_type_id`),
  KEY `pay_grade_id` (`pay_grade_id`),
  CONSTRAINT `leavetype_ibfk_1` FOREIGN KEY (`pay_grade_id`) REFERENCES `paygrade` (`pay_grade_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leavetype`
--

LOCK TABLES `leavetype` WRITE;
/*!40000 ALTER TABLE `leavetype` DISABLE KEYS */;
INSERT INTO `leavetype` VALUES ('d36e67d7-8124-4d79-86fd-2f9ef45f6f37','Sick Leave',10,'d018653a-7376-11ef-abe1-089798ed344a',NULL),('e9f239ea-9476-4037-b3e4-42f47b765b2a','Casual Leave',7,'d018653a-7376-11ef-abe1-089798ed344a',NULL),('f29cd295-6859-4c83-b83a-bffae9823790','Maternity Leave',90,'d018653a-7376-11ef-abe1-089798ed344a',NULL);
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
  `employee_id` varchar(50) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
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
  `name` varchar(50) DEFAULT NULL,
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
INSERT INTO `organization` VALUES ('d015b16d-7376-11ef-abe1-089798ed344a','Sample Organization','123 Sample Street','REG123456',12,65);
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
  `grade` enum('Junior','Mid','Senior','Lead') DEFAULT NULL,
  PRIMARY KEY (`pay_grade_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paygrade`
--

LOCK TABLES `paygrade` WRITE;
/*!40000 ALTER TABLE `paygrade` DISABLE KEYS */;
INSERT INTO `paygrade` VALUES ('d0168883-7376-11ef-abe1-089798ed344a','Junior'),('d0174532-7376-11ef-abe1-089798ed344a','Mid'),('d017e2b4-7376-11ef-abe1-089798ed344a','Senior'),('d018653a-7376-11ef-abe1-089798ed344a','Lead');
/*!40000 ALTER TABLE `paygrade` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `todolist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todolist`
--

LOCK TABLES `todolist` WRITE;
/*!40000 ALTER TABLE `todolist` DISABLE KEYS */;
INSERT INTO `todolist` VALUES ('8142cf02-770c-11ef-9b00-089798ed344a','53eec4a2-737f-11ef-abe1-089798ed344a','test 3 task','2024-09-20',0),('81438994-770c-11ef-9b00-089798ed344a','53eec4a2-737f-11ef-abe1-089798ed344a','test 4 task','2024-09-20',0),('814448ea-770c-11ef-9b00-089798ed344a','53eec4a2-737f-11ef-abe1-089798ed344a','test 5 task','2024-09-20',0);
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
  `role` enum('Admin','HR Manager','Employee','Supervisor') NOT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('53eec4a2-737f-11ef-abe1-089798ed344a','thimira','123','HR Manager',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01 13:58:38
