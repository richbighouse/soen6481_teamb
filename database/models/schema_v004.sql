-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema covid
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema covid
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `covid` DEFAULT CHARACTER SET utf8 ;
USE `covid` ;

-- -----------------------------------------------------
-- Table `covid`.`userType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `covid`.`userType` ;

CREATE TABLE IF NOT EXISTS `covid`.`userType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userType` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userType_UNIQUE` (`userType` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `covid`.`user` ;

CREATE TABLE IF NOT EXISTS `covid`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NULL,
  `dateOfBirth` DATE NULL,
  `phoneNumber` VARCHAR(45) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL,
  `fkUserType` INT NULL,
  `registrationDate` DATE NOT NULL,
  `lastLoginDate` DATE NULL,
  `active` TINYINT NULL,
  `approved` TINYINT NULL,
  `registrationNumber` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fkUserType_idx` (`fkUserType` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fkUserType`
    FOREIGN KEY (`fkUserType`)
    REFERENCES `covid`.`userType` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid`.`assessment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `covid`.`assessment` ;

CREATE TABLE IF NOT EXISTS `covid`.`assessment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `viewedByNurse` TINYINT NOT NULL,
  `fkPatientId` INT NOT NULL,
  `q_difficultyBreathing` VARCHAR(45) NOT NULL,
  `q_ageRange` ENUM('', '5', '6-17', '18+') NULL,
  `q_firstSymptoms` TINYINT NULL,
  `q_situation` TINYINT NULL,
  `q_secondSymptoms` TINYINT NULL,
  `q_hasBeenCloseContact` TINYINT NOT NULL,
  `q_hasBeenTested` TINYINT NOT NULL,
  `q_hasTraveled` TINYINT NOT NULL,
  `assignedDoctorId` INT NULL,
  `rejected` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fkPatientId_idx` (`fkPatientId` ASC) VISIBLE,
  CONSTRAINT `fk_assessment_patient`
    FOREIGN KEY (`fkPatientId`)
    REFERENCES `covid`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid`.`appointment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `covid`.`appointment` ;

CREATE TABLE IF NOT EXISTS `covid`.`appointment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(255) NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `fkPatientId` INT NULL,
  `fkProfessionalId` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkProfessionalId_idx` (`fkProfessionalId` ASC) VISIBLE,
  INDEX `fkPatientId_idx` (`fkPatientId` ASC) VISIBLE,
  CONSTRAINT `fk_appointment_patient`
    FOREIGN KEY (`fkProfessionalId`)
    REFERENCES `covid`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_appointment_professional`
    FOREIGN KEY (`fkPatientId`)
    REFERENCES `covid`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

GRANT ALL ON `covid`.* TO 'coviddbuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `covid`.`userType`
-- -----------------------------------------------------
START TRANSACTION;
USE `covid`;
INSERT INTO `covid`.`userType` (`id`, `userType`) VALUES (1, 'patient');
INSERT INTO `covid`.`userType` (`id`, `userType`) VALUES (2, 'doctor');
INSERT INTO `covid`.`userType` (`id`, `userType`) VALUES (3, 'nurse');
INSERT INTO `covid`.`userType` (`id`, `userType`) VALUES (4, 'manager');

COMMIT;


-- -----------------------------------------------------
-- Data for table `covid`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `covid`;
INSERT INTO `covid`.`user` (`id`, `fullName`, `address`, `dateOfBirth`, `phoneNumber`, `email`, `password`, `fkUserType`, `registrationDate`, `lastLoginDate`, `active`, `approved`, `registrationNumber`) VALUES (DEFAULT, 'Patient Test', '123 Test', '2000-01-01', '5147557112', 'patient@test.com', 'patient', 1, '2021-10-17', NULL, 1, 1, NULL);
INSERT INTO `covid`.`user` (`id`, `fullName`, `address`, `dateOfBirth`, `phoneNumber`, `email`, `password`, `fkUserType`, `registrationDate`, `lastLoginDate`, `active`, `approved`, `registrationNumber`) VALUES (DEFAULT, 'Nurse Test', '123 Test', '2002-02-02', '5147557112', 'nurse@test.com', 'nurse', 3, '2021-10-17', NULL, 1, 1, '12345678');
INSERT INTO `covid`.`user` (`id`, `fullName`, `address`, `dateOfBirth`, `phoneNumber`, `email`, `password`, `fkUserType`, `registrationDate`, `lastLoginDate`, `active`, `approved`, `registrationNumber`) VALUES (DEFAULT, 'Doctor Test', '123 Test', '2003-03-03', '5147557112', 'doctor@test.com', 'doctor', 2, '2021-10-17', NULL, 1, 1, '987654321');
INSERT INTO `covid`.`user` (`id`, `fullName`, `address`, `dateOfBirth`, `phoneNumber`, `email`, `password`, `fkUserType`, `registrationDate`, `lastLoginDate`, `active`, `approved`, `registrationNumber`) VALUES (DEFAULT, 'Admin', '1234 Admin', '2004-04-04', '5147557112', 'admin@test.com', 'admin', 4, '2021-10-17', NULL, 1, 1, NULL);

COMMIT;

