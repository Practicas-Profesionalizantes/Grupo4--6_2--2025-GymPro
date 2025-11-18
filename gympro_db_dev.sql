-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para gympro
CREATE DATABASE IF NOT EXISTS `gympro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `gympro`;

-- Volcando estructura para tabla gympro.log_access
CREATE TABLE IF NOT EXISTS `log_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK__users` (`user`),
  CONSTRAINT `FK__users` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla gympro.log_access: ~1 rows (aproximadamente)
INSERT INTO `log_access` (`id`, `user`, `date`) VALUES
	(1, 2, '2025-09-04 14:58:51');

-- Volcando estructura para tabla gympro.plans
CREATE TABLE IF NOT EXISTS `plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0,
  `inscription` int(11) NOT NULL DEFAULT 0,
  `active` int(11) NOT NULL DEFAULT 0,
  `highlighted` int(11) NOT NULL DEFAULT 0,
  `extraInfo` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla gympro.plans: ~3 rows (aproximadamente)
INSERT INTO `plans` (`id`, `name`, `price`, `discount`, `inscription`, `active`, `highlighted`, `extraInfo`) VALUES
	(1, 'PLAN BÁSICO', 29000, 30, 5000, 1, 0, 'DÉBITO AUTOMÁTICO <span>(Permanencia mínima de 3 meses)</span>'),
	(2, 'PLAN PREMIUM', 49000, 0, 0, 1, 1, '¡TAMBIÉN PODÉS CUOTEAR! <span>(6 pagos de ${PRICE_PER_6})</span>'),
	(3, 'PLAN ELITE', 79000, 0, 0, 1, 0, '¡TAMBIÉN PODÉS CUOTEAR! <span>(6 pagos de ${PRICE_PER_6})</span>');

-- Volcando estructura para tabla gympro.plans_features
CREATE TABLE IF NOT EXISTS `plans_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan` int(11) NOT NULL,
  `feature` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__plans` (`plan`),
  CONSTRAINT `FK__plans` FOREIGN KEY (`plan`) REFERENCES `plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla gympro.plans_features: ~17 rows (aproximadamente)
INSERT INTO `plans_features` (`id`, `plan`, `feature`) VALUES
	(1, 1, 'Acceso al gimnasio'),
	(2, 1, 'Equipamiento estándar'),
	(3, 1, 'Acceso a vestuarios'),
	(4, 1, '2 pases para invitados al mes'),
	(5, 1, 'Planes de entrenamiento online'),
	(6, 2, 'Acceso 24/7 al gimnasio'),
	(7, 2, 'Todo el equipamiento'),
	(8, 2, '4 clases grupales al mes'),
	(9, 2, '1 sesión de entrenamiento personal'),
	(10, 2, 'Evaluación de estado físico'),
	(11, 2, 'Acceso a sauna y spa'),
	(12, 3, 'Todo lo del Plan Premium'),
	(13, 3, 'Clases grupales ilimitadas'),
	(14, 3, '4 sesiones personales'),
	(15, 3, 'Asesoría nutricional'),
	(16, 3, 'Servicio de locker VIP'),
	(17, 3, 'Acceso a todas las sedes');

-- Volcando estructura para tabla gympro.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `device` varchar(50) NOT NULL DEFAULT 'Unknown',
  `application` varchar(50) NOT NULL DEFAULT 'Unknown',
  `ip` varchar(50) NOT NULL DEFAULT 'Unknown',
  `logged` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_session_users` (`userId`),
  CONSTRAINT `FK_session_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla gympro.sessions: ~5 rows (aproximadamente)
INSERT INTO `sessions` (`id`, `userId`, `device`, `application`, `ip`, `logged`) VALUES
	(16, 2, 'Microsoft Windows', 'Chrome', '127.0.0.1', '2025-11-17 20:44:22'),
	(18, 2, 'Microsoft Windows', 'Chrome', '127.0.0.1', '2025-11-17 20:48:16'),
	(19, 2, 'Microsoft Windows', 'Chrome', '127.0.0.1', '2025-11-17 20:48:23'),
	(20, 2, 'iPhone', 'Safari', '127.0.0.1', '2025-11-17 20:48:48'),
	(21, 2, 'Microsoft Windows', 'Chrome', '127.0.0.1', '2025-11-17 21:05:22'),
	(22, 2, 'Microsoft Windows', 'Chrome', '127.0.0.1', '2025-11-17 21:08:02');

-- Volcando estructura para tabla gympro.subscriptions
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `plan` int(11) NOT NULL,
  `expire` date DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_id` (`payment_id`),
  KEY `FK_subscriptions_user` (`user`),
  KEY `FK_subscriptions_plans` (`plan`),
  CONSTRAINT `FK_subscriptions_plans` FOREIGN KEY (`plan`) REFERENCES `plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_subscriptions_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla gympro.subscriptions: ~1 rows (aproximadamente)
INSERT INTO `subscriptions` (`id`, `payment_id`, `user`, `amount`, `plan`, `expire`, `active`) VALUES
	(1, 1324499664, 2, 29000, 1, '2025-09-21', 1);

-- Volcando estructura para tabla gympro.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(50) NOT NULL DEFAULT 'user',
  `email` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla gympro.users: ~1 rows (aproximadamente)
INSERT INTO `users` (`id`, `group`, `email`, `password`, `name`, `lastname`) VALUES
	(2, 'admin', 'asd@gmail.com', '$2b$10$qWuDqZKJ3pFQno0.RovxUu4aF2OslqN4hZo.PvXK24QrWAj0aimY.', 'asd', 'jas');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
