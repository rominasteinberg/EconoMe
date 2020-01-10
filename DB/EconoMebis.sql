-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: EconoMe
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `ahorros`
--

DROP TABLE IF EXISTS `ahorros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ahorros` (
  `id_a` int(11) NOT NULL AUTO_INCREMENT,
  `monto_a` decimal(10,2) NOT NULL,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_u_a` int(11) NOT NULL,
  `id_cp_a` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_a`),
  KEY `fk_ahorros_usuarios1_idx` (`id_u_a`),
  KEY `fk_ahorros_cuenta_proyecto1_idx` (`id_cp_a`),
  CONSTRAINT `fk_ahorros_cuenta_proyecto1` FOREIGN KEY (`id_cp_a`) REFERENCES `cuenta_proyecto` (`id_cp`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ahorros_usuarios1` FOREIGN KEY (`id_u_a`) REFERENCES `usuarios` (`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ahorros`
--

LOCK TABLES `ahorros` WRITE;
/*!40000 ALTER TABLE `ahorros` DISABLE KEYS */;
INSERT INTO `ahorros` VALUES (1,-30000.00,'2019-11-21 11:51:15',4,1,'2019-11-10'),(2,130000.00,'2019-11-21 11:52:43',4,1,'2019-11-09'),(3,50000.00,'2019-11-30 01:28:39',4,1,'2019-11-27');
/*!40000 ALTER TABLE `ahorros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_gastos`
--

DROP TABLE IF EXISTS `categorias_gastos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_gastos` (
  `id_cg` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_g` varchar(255) NOT NULL,
  PRIMARY KEY (`id_cg`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_gastos`
--

LOCK TABLES `categorias_gastos` WRITE;
/*!40000 ALTER TABLE `categorias_gastos` DISABLE KEYS */;
INSERT INTO `categorias_gastos` VALUES (1,'Alquileres');
/*!40000 ALTER TABLE `categorias_gastos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_ingresos`
--

DROP TABLE IF EXISTS `categorias_ingresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_ingresos` (
  `id_ci` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_i` varchar(255) NOT NULL,
  PRIMARY KEY (`id_ci`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_ingresos`
--

LOCK TABLES `categorias_ingresos` WRITE;
/*!40000 ALTER TABLE `categorias_ingresos` DISABLE KEYS */;
INSERT INTO `categorias_ingresos` VALUES (1,'Salario'),(3,'Trabajos Extra'),(4,'Alquileres'),(5,'Préstamo'),(6,'Regalo'),(7,'Venta'),(8,'Aguinaldo');
/*!40000 ALTER TABLE `categorias_ingresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta_proyecto`
--

DROP TABLE IF EXISTS `cuenta_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta_proyecto` (
  `id_cp` int(11) NOT NULL AUTO_INCREMENT,
  `objetivo_cp` decimal(10,2) NOT NULL,
  `id_u_cp` int(11) NOT NULL,
  PRIMARY KEY (`id_cp`),
  KEY `fk_cuenta_proyecto_usuarios1_idx` (`id_u_cp`),
  CONSTRAINT `fk_cuenta_proyecto_usuarios1` FOREIGN KEY (`id_u_cp`) REFERENCES `usuarios` (`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta_proyecto`
--

LOCK TABLES `cuenta_proyecto` WRITE;
/*!40000 ALTER TABLE `cuenta_proyecto` DISABLE KEYS */;
INSERT INTO `cuenta_proyecto` VALUES (1,100000.00,4);
/*!40000 ALTER TABLE `cuenta_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gastos`
--

DROP TABLE IF EXISTS `gastos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gastos` (
  `id_g` int(11) NOT NULL AUTO_INCREMENT,
  `monto_g` decimal(10,2) NOT NULL,
  `detalle_g` varchar(255) DEFAULT NULL,
  `vencimiento_g` date DEFAULT NULL,
  `banco_g` varchar(255) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_u_g` int(11) NOT NULL,
  `id_categoria_g` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `pagado` int(11) DEFAULT '0' COMMENT '0 : no\n1 : si',
  PRIMARY KEY (`id_g`),
  KEY `fk_gastos_usuarios_idx` (`id_u_g`),
  KEY `fk_gastos_categorias_gastos1_idx` (`id_categoria_g`),
  CONSTRAINT `fk_gastos_categorias_gastos1` FOREIGN KEY (`id_categoria_g`) REFERENCES `categorias_gastos` (`id_cg`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gastos_usuarios` FOREIGN KEY (`id_u_g`) REFERENCES `usuarios` (`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gastos`
--

LOCK TABLES `gastos` WRITE;
/*!40000 ALTER TABLE `gastos` DISABLE KEYS */;
INSERT INTO `gastos` VALUES (1,15500.00,'Alquiler Agosto',NULL,NULL,'2019-11-23 19:57:16',4,1,'2019-11-06',0),(2,998.00,'Luz Agosto','2019-12-01','Edesur','2019-11-26 16:17:05',4,1,'2019-11-17',0),(3,500.00,'ropa',NULL,NULL,'2019-11-30 00:59:57',4,1,NULL,1);
/*!40000 ALTER TABLE `gastos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingresos`
--

DROP TABLE IF EXISTS `ingresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingresos` (
  `id_i` int(11) NOT NULL AUTO_INCREMENT,
  `monto_i` decimal(10,2) NOT NULL,
  `id_usuario_i` int(11) NOT NULL,
  `id_categoria_i` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_i`),
  KEY `fk_ingresos_usuarios1_idx` (`id_usuario_i`),
  KEY `fk_ingresos_categorias_ingresos1_idx` (`id_categoria_i`),
  CONSTRAINT `fk_ingresos_categorias_ingresos1` FOREIGN KEY (`id_categoria_i`) REFERENCES `categorias_ingresos` (`id_ci`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingresos_usuarios1` FOREIGN KEY (`id_usuario_i`) REFERENCES `usuarios` (`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingresos`
--

LOCK TABLES `ingresos` WRITE;
/*!40000 ALTER TABLE `ingresos` DISABLE KEYS */;
INSERT INTO `ingresos` VALUES (1,500.00,4,1,'2019-11-10'),(2,50000.00,4,1,'2019-11-27');
/*!40000 ALTER TABLE `ingresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_u` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_u` varchar(255) NOT NULL,
  `apellido_u` varchar(255) NOT NULL,
  `email_u` varchar(255) NOT NULL,
  `codigo_email_u` varchar(255) NOT NULL,
  `cuenta_confirmada_u` int(11) DEFAULT NULL,
  `password_u` varchar(255) NOT NULL,
  `permisos_u` varchar(255) NOT NULL DEFAULT 'user',
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_u`),
  UNIQUE KEY `email_u_UNIQUE` (`email_u`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'Romina','Steinberg','rominamarmor@gmail.com','4e1fa331-564f-4c47-9ce4-ee6786a98b6d',1,'81dc9bdb52d04dc20036dbd8313ed055','admin','2019-11-19 20:23:55'),(5,'Romina','Steinberg','rominasteinberg@gmail.com','5accd09e-9339-4c5f-b753-6b8d7ec2efbc',1,'81dc9bdb52d04dc20036dbd8313ed055','admin','2019-11-20 22:54:15');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-30 13:35:33
