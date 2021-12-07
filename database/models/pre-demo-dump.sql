CREATE DATABASE  IF NOT EXISTS `covid` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `covid`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: covid
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime DEFAULT NULL,
  `fkPatientId` int DEFAULT NULL,
  `fkProfessionalId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkProfessionalId_idx` (`fkProfessionalId`),
  KEY `fkPatientId_idx` (`fkPatientId`),
  CONSTRAINT `fk_appointment_patient` FOREIGN KEY (`fkProfessionalId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_appointment_professional` FOREIGN KEY (`fkPatientId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (13,'CLSC','2021-12-08 08:00:00','2021-12-08 09:00:00',5,9),(14,'CLSC','2021-12-08 10:00:00','2021-12-08 11:00:00',8,9),(15,'CLSC','2021-12-09 10:30:00','2021-12-09 11:30:00',13,9),(16,'CLSC','2021-12-09 13:00:00','2021-12-09 14:00:00',16,9),(17,'Hospital','2021-12-08 14:30:00','2021-12-08 15:30:00',17,30),(18,'Hospital','2021-12-10 09:30:00','2021-12-10 11:00:00',18,30),(19,'Hospital','2021-12-09 18:30:00','2021-12-09 19:30:00',20,30);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment`
--

DROP TABLE IF EXISTS `assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `viewedByNurse` tinyint NOT NULL,
  `fkPatientId` int NOT NULL,
  `q_difficultyBreathing` tinyint NOT NULL,
  `q_ageRange` enum('','5','6-17','18+') DEFAULT NULL,
  `q_firstSymptoms` tinyint DEFAULT NULL,
  `q_situation` tinyint DEFAULT NULL,
  `q_secondSymptoms` tinyint DEFAULT NULL,
  `q_hasBeenCloseContact` tinyint NOT NULL,
  `q_hasBeenTested` tinyint NOT NULL,
  `q_hasTraveled` tinyint NOT NULL,
  `assignedDoctorId` int DEFAULT NULL,
  `rejected` tinyint NOT NULL DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fkPatientId_idx` (`fkPatientId`),
  CONSTRAINT `fk_assessment_patient` FOREIGN KEY (`fkPatientId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment`
--

LOCK TABLES `assessment` WRITE;
/*!40000 ALTER TABLE `assessment` DISABLE KEYS */;
INSERT INTO `assessment` VALUES (9,'2021-11-07',1,8,0,'18+',1,NULL,NULL,0,0,0,NULL,0,0),(10,'2021-11-08',1,13,0,'18+',0,1,NULL,0,1,0,NULL,0,0),(20,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(21,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(22,'2021-12-06',1,5,1,'',NULL,NULL,NULL,0,1,1,NULL,0,0),(23,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(24,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(25,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(26,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(27,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(28,'2021-12-06',1,5,1,'',NULL,NULL,NULL,0,1,0,NULL,0,0),(29,'2021-12-06',1,5,1,'',NULL,NULL,NULL,0,1,1,NULL,0,0),(30,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(31,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(32,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(33,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(34,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(35,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,0),(36,'2021-12-06',1,5,1,'',NULL,NULL,NULL,1,1,1,NULL,0,1),(37,'2021-12-06',1,8,0,'18+',0,NULL,0,0,0,0,NULL,0,1),(38,'2021-12-06',1,13,0,'6-17',1,0,NULL,1,0,1,NULL,0,1),(39,'2021-12-06',1,16,0,'5',0,NULL,NULL,0,1,1,NULL,0,1),(40,'2021-12-06',1,17,0,'18+',1,1,NULL,1,0,1,30,0,1),(41,'2021-12-06',1,18,1,'',NULL,NULL,NULL,1,1,0,30,0,1),(42,'2021-12-06',1,19,0,'18+',0,1,1,0,1,1,30,0,1),(43,'2021-12-06',1,20,1,'',NULL,NULL,NULL,1,0,0,30,0,1),(44,'2021-12-06',0,21,1,'',NULL,NULL,NULL,1,1,1,NULL,0,1),(45,'2021-12-06',0,22,0,'6-17',0,1,1,0,1,1,NULL,0,1),(46,'2021-12-07',0,34,1,'',NULL,NULL,NULL,1,1,1,NULL,0,1),(47,'2021-12-07',1,33,1,'',NULL,NULL,NULL,1,1,1,30,0,1),(48,'2021-12-07',1,35,1,'',NULL,NULL,NULL,1,1,1,30,0,1),(49,'2021-12-07',0,36,1,'',NULL,NULL,NULL,1,1,1,NULL,0,1);
/*!40000 ALTER TABLE `assessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fkUserType` int DEFAULT NULL,
  `registrationDate` date NOT NULL,
  `lastLoginDate` date DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  `approved` tinyint DEFAULT NULL,
  `registrationNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fkUserType_idx` (`fkUserType`),
  CONSTRAINT `fkUserType` FOREIGN KEY (`fkUserType`) REFERENCES `usertype` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Naril Logan','123 Test','2002-02-02','5147557112','nurse@test.com','nurse',3,'2021-10-17',NULL,1,1,'12345678'),(4,'Admin','1234 Admin','2004-04-04','5147557112','admin@test.com','admin',4,'2021-10-17',NULL,1,1,NULL),(5,'Paul Miller','222 Avenue','1999-01-01','4507557777','pmiller@test.com','pmiller',1,'2021-11-11',NULL,1,1,NULL),(8,'Phillys Vance','555 Boulevard','1975-02-04','5147331234','pvance@test.com','pvance',1,'2021-11-11',NULL,1,1,NULL),(9,'Nancy Brown','666 Highway','1985-05-15','5148989909','nbrown@test.com','nbrown',3,'2021-11-11',NULL,1,1,'335577'),(13,'Prince Consuella','1001 Castle','2002-07-07','5145695808','pconsuella@test.com','pconsuella',1,'2021-11-11',NULL,1,1,NULL),(16,'Phil Leduc','2223 Cactus','2021-07-05','5149773323','pleduc@test.com','pleduc',1,'2021-12-06',NULL,1,1,NULL),(17,'Pat Demers','44 Opportunity','2021-05-03','5142345566','pdemers@test.com','pdemers',1,'2021-12-06',NULL,1,1,NULL),(18,'Pierre-Marc Beaulieu','2233 Du Lac','2021-04-04','81965434567','pbeaulieu@test.com','pbeaulieu',1,'2021-12-06',NULL,1,1,NULL),(19,'Pierre Turgeon','44 Buts','2021-08-29','5149110009','pturgeon@test.com','pturgeon',1,'2021-12-06',NULL,1,1,NULL),(20,'Pascale Nadeau','8877 Radios','2021-09-16','5149876655','pnadeau@test.com','pnadeau',1,'2021-12-06',NULL,1,1,NULL),(21,'Pejman Sayan','555 Smith','2021-12-05','4503458787','psayan@test.com','psayan',1,'2021-12-06',NULL,1,1,NULL),(22,'Paula Abdul','555 Hollywood','2021-05-04','2129998765','pabdul@test.com','pabdul',1,'2021-12-06',NULL,1,1,NULL),(23,'Nicole Syl','77 Mountain','2021-12-07','5144453344','nsyl@test.com','nsyl',3,'2021-12-06',NULL,1,1,'N10007'),(24,'Nora Fotuhi','1000 Gauche','2021-11-10','7248887765','nfotuhi@test.com','nfotuhi',3,'2021-12-06',NULL,1,1,'N20345'),(25,'Nicolas Tesla','4321 Rue','2021-09-12','5147653324','ntesla@test.com','ntesla',3,'2021-12-06',NULL,1,1,'N312345'),(26,'Nancy Dion','87 Patate','2021-08-08','5146872222','ndion@test.com','ndion',3,'2021-12-06',NULL,1,1,'N746251'),(27,'Natasha Malkina','71 Goal','2021-08-10','7171717171','nmalkina@test.com','nmalkina',3,'2021-12-06',NULL,1,NULL,'N8877665'),(28,'Darcy Tucker','15 Canoe','2021-11-29','5147756512','dtucker@test.com','dtucker',2,'2021-12-06',NULL,1,1,'D223451'),(29,'Dona Smith','443 Street','2021-08-30','5147551112','dsmith@test.com','dsmith',2,'2021-12-06',NULL,1,NULL,'D123456'),(30,'Damien Cox','543 Fixit','2021-11-30','5145642233','dcox@test.com','dcox',2,'2021-12-06',NULL,1,1,'D432156'),(31,'Dora Loki','232 Thatit','2021-10-04','5146789999','dloki@test.com','dloki',2,'2021-12-06',NULL,1,1,'D987654'),(32,'Dick Tracy','3332 June','2021-07-20','5147762123','dtracy@test.com','dtracy',2,'2021-12-06',NULL,1,NULL,'D765456'),(33,'Phil Milot','22 Lockhart','2021-12-05','5145675645','pmilot@test.com','pmilot',1,'2021-12-07',NULL,1,1,NULL),(34,'Peppa Swine','123 Oink','2021-12-06','5147778889','pswine@test.com','pswine',1,'2021-12-07',NULL,1,1,NULL),(35,'Patrick Roy','33 Victoire','2021-07-05','5146548821','proy@test.com','proy',1,'2021-12-07',NULL,1,1,NULL),(36,'Patrice Bergeron','37 Boston','2021-07-06','5143703737','pbergeron@test.com','pbergeron',1,'2021-12-07',NULL,1,1,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userType` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userType_UNIQUE` (`userType`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (2,'doctor'),(4,'manager'),(3,'nurse'),(1,'patient');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-06 19:21:15
