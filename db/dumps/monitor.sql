-- MySQL dump 10.17  Distrib 10.3.12-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: monitor
-- ------------------------------------------------------
-- Server version	10.3.12-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `icon_color` varchar(25) DEFAULT NULL,
  `order` varchar(4) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_by` varchar(60) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_by` varchar(60) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Configuração','Settings','/settings','mdi-cogs',NULL,'1',NULL,NULL,'2022-02-10 08:17:17.773785',NULL,'2022-02-10 13:41:01.938460',NULL,NULL),(2,'Dashboards','Dashboards','/monitor/dashboard','mdi-monitor-dashboard',NULL,'2',NULL,NULL,'2022-02-09 09:32:32.388631',NULL,'2022-02-10 08:17:17.773335',NULL,NULL),(3,'Usuários','Users','/monitor/usuarios','mdi-account',NULL,'3',NULL,NULL,'2022-02-09 09:32:32.389185',NULL,'2022-02-10 08:17:17.772876',NULL,NULL),(4,'Variáveis','Variables','/monitor/variables','mdi-variable',NULL,'4',NULL,NULL,'2022-02-09 09:32:32.390497',NULL,'2022-02-10 08:17:17.771144',NULL,NULL),(5,'Eventos','Events','/monitor/events','mdi-clock-fast',NULL,'5',NULL,NULL,'2022-02-09 09:32:32.390911',NULL,'2022-02-10 08:17:17.770333',NULL,NULL),(6,'Acessos','Users','/settings/user','mdi-account-tie-outline',NULL,'1',1,NULL,'2022-02-10 09:23:21.726912',NULL,'2022-02-10 17:16:39.954194',NULL,NULL),(7,'Menus','Menus','/settings/menu','mdi-menu',NULL,'2',1,NULL,'2022-02-10 09:23:21.727571',NULL,'2022-02-10 17:16:39.953568',NULL,NULL),(8,'Perfis','Profiles','/settings/profile','mdi-card-account-details',NULL,'3',1,NULL,'2022-02-10 09:23:21.729069',NULL,'2022-02-10 17:16:39.950787',NULL,NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `obs` varchar(90) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT 'CURRENT_TIMESTAMP(6)',
  `updated_by` varchar(60) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_by` varchar(60) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'DBA','DBA','27889-rafael','CURRENT_TIMESTAMP(6)',NULL,'2022-01-21 14:53:50.397878',NULL,NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_menu`
--

DROP TABLE IF EXISTS `profile_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_menu` (
  `profile_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`profile_id`,`menu_id`),
  KEY `IDX_c934c9f25232b7a55fb3bf31c1` (`profile_id`),
  KEY `IDX_6c21f096f419248061640af432` (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_menu`
--

LOCK TABLES `profile_menu` WRITE;
/*!40000 ALTER TABLE `profile_menu` DISABLE KEYS */;
INSERT INTO `profile_menu` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8);
/*!40000 ALTER TABLE `profile_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_screen`
--

DROP TABLE IF EXISTS `request_screen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_screen` (
  `created_by` varchar(60) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_by` varchar(60) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_by` varchar(60) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(250) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `note` varchar(250) DEFAULT NULL,
  `screen_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_46058b95f789df7747aa5906980` (`screen_id`),
  CONSTRAINT `FK_46058b95f789df7747aa5906980` FOREIGN KEY (`screen_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_screen`
--

LOCK TABLES `request_screen` WRITE;
/*!40000 ALTER TABLE `request_screen` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_screen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(250) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `profile_id` int(11) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `url_photograph` varchar(250) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `theme` varchar(500) DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_by` varchar(60) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_by` varchar(60) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'27889-RAFAEL','RAFAEL MACHADO','dba@',1,1,'C3614206A443012045CFD75D2600AF2D',NULL,NULL,NULL,NULL,'27889-rafael','2022-01-21 14:50:02.978694',NULL,'2022-02-03 17:07:44.520730',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_request`
--

DROP TABLE IF EXISTS `user_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_request` (
  `user_id` int(11) NOT NULL,
  `request_screen_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`request_screen_id`),
  KEY `IDX_38ae3e854ebc5f9eabe3ab567a` (`user_id`),
  KEY `IDX_b3bc5748ccc27e9ab3bc730fc2` (`request_screen_id`),
  CONSTRAINT `FK_38ae3e854ebc5f9eabe3ab567a7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_b3bc5748ccc27e9ab3bc730fc22` FOREIGN KEY (`request_screen_id`) REFERENCES `request_screen` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_request`
--

LOCK TABLES `user_request` WRITE;
/*!40000 ALTER TABLE `user_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'monitor'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 17:02:45
