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
CREATE TABLE IF NOT EXISTS `covid`.`userType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userType` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userType_UNIQUE` (`userType` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `covid`.`user`
-- -----------------------------------------------------
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
CREATE TABLE IF NOT EXISTS `covid`.`assessment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `need_to_define_results` VARCHAR(45) NULL,
  `fkPatientId` INT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
