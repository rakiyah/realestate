-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 31, 2023 at 11:02 AM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

-- Wesley Anding and Rakiyah Mullings
-- Project Group 66

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS=0;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_andingw`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE OR REPLACE TABLE `agents` (
  `agent_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`agent_id`),
  UNIQUE KEY `agent_id_UNIQUE` (`agent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO  `agents` (`agent_id`, `email`, `phone`, `name`) VALUES
('3001', 'steve.dufer@realEstate.com', '5414198951', 'Steve Dufer'),
('3002',	'jill.beboop@realEstate.com',	'5414198952',	'Jill Beboop'),
('3003',	'Amy.buyfrom@realestate.com',	'5414198953',	'Amy Buyfrom'),
('3004',	'sarah.sarrah@realEstate.com', '5414198954',	'Sarah Sarrah');
-- --------------------------------------------------------

--
-- Table structure for table `potentialBuyers`
--

CREATE OR REPLACE TABLE `potentialBuyers` (
  `buyer_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `agent_id` int(11) NOT NULL,
  PRIMARY KEY (`buyer_id`),
  UNIQUE KEY `buyer_id_UNIQUE` (`buyer_id`),
  KEY `fk_potentialBuyers_agents1_idx` (`agent_id`),
  CONSTRAINT `fk_potentialBuyers_agents1` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `potentialBuyers` (`buyer_id`, `email`, `phone`, `name`, `agent_id`) VALUES
('4000',	'sviste0@tuttocitta.it',	'9631053845',	'Sharona'	, '3001'),
('4001',	'bjentzsch1@blogger.com',	'1694530388',	'Becky',	'3003'),
('4002',	'rwestraw2@tumblr.com',	'8532867382',	'Rani',	'3003'),
('4003',	'lmccloid3@ca.gov',	'3018540055',	'Lark',	'3004'),
('4004',	'bhuntington4@newyorker.com',	'4516758628',	'Betteanne',	'3002'),
('4005',	'rmantripp5@smugmug.com',	'6194209473',	'Rozalin',	'3003'),
('4006',	'smacpaik6@netscape.com',	'7305396622',	'Samantha',	'3003');

-- --------------------------------------------------------

--
-- Table structure for table `potentialBuyers_has_properties`
--

CREATE OR REPLACE TABLE `potentialBuyers_has_properties` (
  `buyer_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  PRIMARY KEY (`buyer_id`,`property_id`),
  KEY `fk_potentialBuyers_has_properties_properties1_idx` (`property_id`),
  KEY `fk_potentialBuyers_has_properties_potentialBuyers_idx` (`buyer_id`),
  CONSTRAINT `fk_potentialBuyers_has_properties_potentialBuyers` FOREIGN KEY (`buyer_id`) REFERENCES `potentialBuyers` (`buyer_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_potentialBuyers_has_properties_properties1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `potentialBuyers_has_properties` (`buyer_id`, `property_id`) VALUES
('4001', '1000'),
('4002', '1002'),
('4006', '1004'),
('4003', '1005'),
('4004', '1001'),
('4002', '1001'),
('4000', '1000'),
('4006', '1001'),
('4002', '1000'),
('4004', '1002'),
('4005', '1004'),
('4006', '1005'),
('4002', '1003'),
('4002', '1006');


-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE OR REPLACE TABLE `sellers` (
  `seller_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `agent_id` int(11) NOT NULL,
  PRIMARY KEY (`seller_id`),
  UNIQUE KEY `seller_id_UNIQUE` (`seller_id`),
  KEY `fk_sellers_agents1_idx` (`agent_id`),
  CONSTRAINT `fk_sellers_agents1` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`agent_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `sellers` (`seller_id`, `email`, `phone`, `name`, `agent_id`) VALUES
('2100', 'egraysmark0@miibeian.gov.cn',	'6203538642',	'Electra',	'3001'),
('2101', 'mswainsbury1@who.int',	'2349216498',	'Modestia',	'3003'),
('2102', 'vgerlts2@xing.com',	'1595116819',	'Vin',	'3002'),
('2103', 'sberriball3@bandcamp.com',	'3188867633',	'Selma',	'3004'),
('2104', 'jerry@goooogle.com',	'134113411',	'Jerry',	'3004'),
('2105', 'smithss@xing.com',	'2813308004',	'Sam',	'3004');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE OR REPLACE TABLE `properties` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) NOT NULL,
  `listed_price` decimal(30,0) DEFAULT NULL,
  `buyer_id` int(11) DEFAULT NULL,
  `potentialBuyers_agent_id` int(11) DEFAULT NULL,
  `seller_id` int(11) NOT NULL,
  `sellers_agent_id` int(11) DEFAULT NULL,
  `on_market` tinyint(4) NOT NULL DEFAULT 0,
  `sell_price` decimal(30,0) DEFAULT NULL,
  `sell_date` datetime DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  UNIQUE KEY `property_id_UNIQUE` (`property_id`),
  KEY `fk_properties_potentialBuyers1_idx` (`buyer_id`,`potentialBuyers_agent_id`),
  KEY `fk_properties_sellers1_idx` (`seller_id`,`sellers_agent_id`),
  CONSTRAINT `fk_properties_potentialBuyers1` FOREIGN KEY (`buyer_id`) REFERENCES `potentialBuyers` (`buyer_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_properties_sellers1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`seller_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `properties` (`property_id`, `address`, `listed_price`, `buyer_id`, `potentialBuyers_agent_id`,	`seller_id`, `sellers_agent_id`, `on_market`, `sell_price`,	`sell_date`) VALUES
('1000', '645 Springview Parkway', '6270557.09', '4001','3003','2105','3004','1','6530367.65','2023-03-03 17:06:12'),
('1001', '95 Rigney Center', '9908671.85', '4004','3002','2100','3001','1','9928581.34','2023-03-19 10:47:58'),
('1002', '7463 Bellgrove Parkway', '8245831.43', '4004','3002','2102','3002','1','2910221.35','2022-10-26 5:09:02'),
('1003', '7991 Rutledge Terrace', '9949672.33','4002','3003','2103','3004','0','9991919.96','2022-12-28 16:49:03'),
('1004', '8267 Arizona Trail', '3212903.30', '4005','3003','2104','3004','1','9024473.22','2022-12-19 23:53:22'),
('1005', '06 Pepper Wood Road', '5935471.47', '4006','3003','2102','3002','1','3963258.07','2022-11-21 14:24:51'),
('1006', '1600 Pennsylvania Ave', '3093186.67','4002','3003','2101','3003','0','4969757.15','2023-04-09 0:07:50');



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
