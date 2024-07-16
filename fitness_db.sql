-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 02 mai 2024 à 18:11
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fitness_db`
--
CREATE DATABASE IF NOT EXISTS `fitness_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fitness_db`;

-- --------------------------------------------------------

--
-- Structure de la table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
CREATE TABLE IF NOT EXISTS `challenges` (
  `challenge_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) NOT NULL,
  `challenge_description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`challenge_id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
CREATE TABLE IF NOT EXISTS `coaches` (
  `coach_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `rating_avg` decimal(3,2) DEFAULT 0.00,
  PRIMARY KEY (`coach_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `coachqualifications`
--

DROP TABLE IF EXISTS `coachqualifications`;
CREATE TABLE IF NOT EXISTS `coachqualifications` (
  `qualification_id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) NOT NULL,
  `qualification_name` varchar(255) NOT NULL,
  `institution_name` varchar(255) DEFAULT NULL,
  `year_obtained` int(11) DEFAULT NULL,
  PRIMARY KEY (`qualification_id`),
  KEY `coach_id` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `coachratings`
--

DROP TABLE IF EXISTS `coachratings`;
CREATE TABLE IF NOT EXISTS `coachratings` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `rating_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rating_id`),
  KEY `coach_id` (`coach_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `coachspecializations`
--

DROP TABLE IF EXISTS `coachspecializations`;
CREATE TABLE IF NOT EXISTS `coachspecializations` (
  `specialization_id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`specialization_id`),
  KEY `coach_id` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `content_id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `content_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT 1,
  `goal_specifics` text DEFAULT NULL,
  `average_rating` decimal(3,2) DEFAULT 0.00,
  `number_of_ratings` int(11) DEFAULT 0,
  PRIMARY KEY (`content_id`),
  KEY `coach_id` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contentgoals`
--

DROP TABLE IF EXISTS `contentgoals`;
CREATE TABLE IF NOT EXISTS `contentgoals` (
  `content_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  PRIMARY KEY (`content_id`,`goal_id`),
  KEY `goal_id` (`goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contentnutrition`
--

DROP TABLE IF EXISTS `contentnutrition`;
CREATE TABLE IF NOT EXISTS `contentnutrition` (
  `content_id` int(11) NOT NULL,
  `nutrition_program_id` int(11) NOT NULL,
  PRIMARY KEY (`content_id`,`nutrition_program_id`),
  KEY `nutrition_program_id` (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contentratings`
--

DROP TABLE IF EXISTS `contentratings`;
CREATE TABLE IF NOT EXISTS `contentratings` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `rating_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ease_of_use` int(11) DEFAULT NULL,
  `effectiveness` int(11) DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `content_id` (`content_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déclencheurs `contentratings`
--
DROP TRIGGER IF EXISTS `UpdateContentRating`;
DELIMITER $$
CREATE TRIGGER `UpdateContentRating` AFTER INSERT ON `contentratings` FOR EACH ROW BEGIN
    UPDATE Content
    SET average_rating = (SELECT AVG(rating) FROM ContentRatings WHERE content_id = NEW.content_id),
        number_of_ratings = (SELECT COUNT(*) FROM ContentRatings WHERE content_id = NEW.content_id)
    WHERE content_id = NEW.content_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
CREATE TABLE IF NOT EXISTS `enrollments` (
  `user_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `enroll_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `progress` int(11) DEFAULT 0,
  PRIMARY KEY (`user_id`,`content_id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `exercisegoals`
--

DROP TABLE IF EXISTS `exercisegoals`;
CREATE TABLE IF NOT EXISTS `exercisegoals` (
  `exercise_id` int(11) NOT NULL,
  `goal_id` int(11) NOT NULL,
  PRIMARY KEY (`exercise_id`,`goal_id`),
  KEY `goal_id` (`goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `exercisenutrition`
--

DROP TABLE IF EXISTS `exercisenutrition`;
CREATE TABLE IF NOT EXISTS `exercisenutrition` (
  `exercise_id` int(11) NOT NULL,
  `nutrition_program_id` int(11) NOT NULL,
  PRIMARY KEY (`exercise_id`,`nutrition_program_id`),
  KEY `nutrition_program_id` (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
CREATE TABLE IF NOT EXISTS `exercises` (
  `exercise_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `goal_specifics` text DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `fitnessgoals`
--

DROP TABLE IF EXISTS `fitnessgoals`;
CREATE TABLE IF NOT EXISTS `fitnessgoals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `goal_description` text NOT NULL,
  `target_date` date DEFAULT NULL,
  `status` enum('active','completed','failed') DEFAULT 'active',
  PRIMARY KEY (`goal_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `published_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`news_id`),
  KEY `coach_id` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `nutritionadvice`
--

DROP TABLE IF EXISTS `nutritionadvice`;
CREATE TABLE IF NOT EXISTS `nutritionadvice` (
  `advice_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nutrition_program_id` int(11) NOT NULL,
  `advice_text` text NOT NULL,
  `date_given` date NOT NULL,
  PRIMARY KEY (`advice_id`),
  KEY `user_id` (`user_id`),
  KEY `nutrition_program_id` (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `nutritiondetails`
--

DROP TABLE IF EXISTS `nutritiondetails`;
CREATE TABLE IF NOT EXISTS `nutritiondetails` (
  `nutrition_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `nutrition_program_id` int(11) NOT NULL,
  `meal_type` enum('breakfast','lunch','dinner','snack') NOT NULL,
  `ingredients` text NOT NULL,
  `preparation` text DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `proteins` decimal(5,2) DEFAULT NULL,
  `carbs` decimal(5,2) DEFAULT NULL,
  `fats` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`nutrition_detail_id`),
  KEY `nutrition_program_id` (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `nutritionprograms`
--

DROP TABLE IF EXISTS `nutritionprograms`;
CREATE TABLE IF NOT EXISTS `nutritionprograms` (
  `nutrition_program_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_method` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `privatediscussions`
--

DROP TABLE IF EXISTS `privatediscussions`;
CREATE TABLE IF NOT EXISTS `privatediscussions` (
  `discussion_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `coach_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`discussion_id`),
  KEY `user_id` (`user_id`),
  KEY `coach_id` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `progress`
--

DROP TABLE IF EXISTS `progress`;
CREATE TABLE IF NOT EXISTS `progress` (
  `progress_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`progress_id`),
  KEY `user_id` (`user_id`),
  KEY `exercise_id` (`exercise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `recommendations`
--

DROP TABLE IF EXISTS `recommendations`;
CREATE TABLE IF NOT EXISTS `recommendations` (
  `recommendation_id` int(11) NOT NULL AUTO_INCREMENT,
  `recommender_id` int(11) NOT NULL,
  `recommended_coach_id` int(11) NOT NULL,
  `recommended_to_user_id` int(11) NOT NULL,
  `recommendation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`recommendation_id`),
  KEY `recommender_id` (`recommender_id`),
  KEY `recommended_coach_id` (`recommended_coach_id`),
  KEY `recommended_to_user_id` (`recommended_to_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) NOT NULL,
  `session_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `location` varchar(255) DEFAULT NULL,
  `max_participants` int(11) DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `stages`
--

DROP TABLE IF EXISTS `stages`;
CREATE TABLE IF NOT EXISTS `stages` (
  `stage_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `order_index` int(11) DEFAULT NULL,
  PRIMARY KEY (`stage_id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `subscriptionplans`
--

DROP TABLE IF EXISTS `subscriptionplans`;
CREATE TABLE IF NOT EXISTS `subscriptionplans` (
  `plan_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_days` int(11) NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trainingsessions`
--

DROP TABLE IF EXISTS `trainingsessions`;
CREATE TABLE IF NOT EXISTS `trainingsessions` (
  `training_session_id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `attended` tinyint(1) NOT NULL DEFAULT 0,
  `attendance_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`training_session_id`),
  KEY `session_id` (`session_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `usernutrition`
--

DROP TABLE IF EXISTS `usernutrition`;
CREATE TABLE IF NOT EXISTS `usernutrition` (
  `user_id` int(11) NOT NULL,
  `nutrition_program_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `adherence_percentage` decimal(5,2) DEFAULT 100.00,
  PRIMARY KEY (`user_id`,`nutrition_program_id`),
  KEY `nutrition_program_id` (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `usernutritionprogress`
--

DROP TABLE IF EXISTS `usernutritionprogress`;
CREATE TABLE IF NOT EXISTS `usernutritionprogress` (
  `progress_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nutrition_program_id` int(11) NOT NULL,
  `date_logged` date NOT NULL,
  `meals_consumed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meals_consumed`)),
  `calories_intake` int(11) DEFAULT NULL,
  `protein_intake` decimal(5,2) DEFAULT NULL,
  `carbs_intake` decimal(5,2) DEFAULT NULL,
  `fats_intake` decimal(5,2) DEFAULT NULL,
  `adherence_score` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`progress_id`),
  KEY `user_id` (`user_id`),
  KEY `nutrition_program_id` (`nutrition_program_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` char(64) NOT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `usersubscriptions`
--

DROP TABLE IF EXISTS `usersubscriptions`;
CREATE TABLE IF NOT EXISTS `usersubscriptions` (
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`plan_id`),
  KEY `plan_id` (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `challenges_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

--
-- Contraintes pour la table `coaches`
--
ALTER TABLE `coaches`
  ADD CONSTRAINT `coaches_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `coachqualifications`
--
ALTER TABLE `coachqualifications`
  ADD CONSTRAINT `coachqualifications_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`);

--
-- Contraintes pour la table `coachratings`
--
ALTER TABLE `coachratings`
  ADD CONSTRAINT `coachratings_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`),
  ADD CONSTRAINT `coachratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `coachspecializations`
--
ALTER TABLE `coachspecializations`
  ADD CONSTRAINT `coachspecializations_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`);

--
-- Contraintes pour la table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`);

--
-- Contraintes pour la table `contentgoals`
--
ALTER TABLE `contentgoals`
  ADD CONSTRAINT `contentgoals_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  ADD CONSTRAINT `contentgoals_ibfk_2` FOREIGN KEY (`goal_id`) REFERENCES `fitnessgoals` (`goal_id`);

--
-- Contraintes pour la table `contentnutrition`
--
ALTER TABLE `contentnutrition`
  ADD CONSTRAINT `contentnutrition_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  ADD CONSTRAINT `contentnutrition_ibfk_2` FOREIGN KEY (`nutrition_program_id`) REFERENCES `nutritionprograms` (`nutrition_program_id`);

--
-- Contraintes pour la table `contentratings`
--
ALTER TABLE `contentratings`
  ADD CONSTRAINT `contentratings_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  ADD CONSTRAINT `contentratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

--
-- Contraintes pour la table `exercisegoals`
--
ALTER TABLE `exercisegoals`
  ADD CONSTRAINT `exercisegoals_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  ADD CONSTRAINT `exercisegoals_ibfk_2` FOREIGN KEY (`goal_id`) REFERENCES `fitnessgoals` (`goal_id`);

--
-- Contraintes pour la table `exercisenutrition`
--
ALTER TABLE `exercisenutrition`
  ADD CONSTRAINT `exercisenutrition_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  ADD CONSTRAINT `exercisenutrition_ibfk_2` FOREIGN KEY (`nutrition_program_id`) REFERENCES `nutritionprograms` (`nutrition_program_id`);

--
-- Contraintes pour la table `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

--
-- Contraintes pour la table `fitnessgoals`
--
ALTER TABLE `fitnessgoals`
  ADD CONSTRAINT `fitnessgoals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `nutritionadvice`
--
ALTER TABLE `nutritionadvice`
  ADD CONSTRAINT `nutritionadvice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `nutritionadvice_ibfk_2` FOREIGN KEY (`nutrition_program_id`) REFERENCES `nutritionprograms` (`nutrition_program_id`);

--
-- Contraintes pour la table `nutritiondetails`
--
ALTER TABLE `nutritiondetails`
  ADD CONSTRAINT `nutritiondetails_ibfk_1` FOREIGN KEY (`nutrition_program_id`) REFERENCES `nutritionprograms` (`nutrition_program_id`);

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

--
-- Contraintes pour la table `privatediscussions`
--
ALTER TABLE `privatediscussions`
  ADD CONSTRAINT `privatediscussions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `privatediscussions_ibfk_2` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`coach_id`);

--
-- Contraintes pour la table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`);

--
-- Contraintes pour la table `recommendations`
--
ALTER TABLE `recommendations`
  ADD CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`recommender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `recommendations_ibfk_2` FOREIGN KEY (`recommended_coach_id`) REFERENCES `coaches` (`coach_id`),
  ADD CONSTRAINT `recommendations_ibfk_3` FOREIGN KEY (`recommended_to_user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

--
-- Contraintes pour la table `stages`
--
ALTER TABLE `stages`
  ADD CONSTRAINT `stages_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`);

--
-- Contraintes pour la table `trainingsessions`
--
ALTER TABLE `trainingsessions`
  ADD CONSTRAINT `trainingsessions_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`session_id`),
  ADD CONSTRAINT `trainingsessions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `usernutrition`
--
ALTER TABLE `usernutrition`
  ADD CONSTRAINT `usernutrition_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `usernutrition_ibfk_2` FOREIGN KEY (`nutrition_program_id`) REFERENCES `nutritionprograms` (`nutrition_program_id`);

--
-- Contraintes pour la table `usernutritionprogress`
--
ALTER TABLE `usernutritionprogress`
  ADD CONSTRAINT `usernutritionprogress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `usernutritionprogress_ibfk_2` FOREIGN KEY (`nutrition_program_id`) REFERENCES `nutritionprograms` (`nutrition_program_id`);

--
-- Contraintes pour la table `usersubscriptions`
--
ALTER TABLE `usersubscriptions`
  ADD CONSTRAINT `usersubscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `usersubscriptions_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `subscriptionplans` (`plan_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- Table pour les programmes de parrainage
CREATE TABLE AffiliatePrograms (
    affiliate_program_id INT AUTO_INCREMENT PRIMARY KEY,
    content_id INT,
    commission_rate DECIMAL(5,2) NOT NULL,  -- Pourcentage de commission sur les ventes
    program_description TEXT,
    FOREIGN KEY (content_id) REFERENCES Content(content_id)
);

-- Table pour les liens de parrainage générés par les utilisateurs
CREATE TABLE AffiliateLinks (
    affiliate_link_id INT AUTO_INCREMENT PRIMARY KEY,
    affiliate_program_id INT NOT NULL,
    user_id INT NOT NULL,
    generated_link TEXT NOT NULL,  -- Lien unique généré pour le parrainage
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_program_id) REFERENCES AffiliatePrograms(affiliate_program_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Table pour suivre les ventes générées par chaque lien de parrainage
CREATE TABLE AffiliateSales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    affiliate_link_id INT NOT NULL,
    sale_amount DECIMAL(10,2) NOT NULL,  -- Montant de la vente
    commission_earned DECIMAL(10,2) NOT NULL,  -- Commission gagnée sur la vente
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affiliate_link_id) REFERENCES AffiliateLinks(affiliate_link_id)
);

-- Les Tables manquantes
CREATE TABLE usercoach (
    user_id INT,
    coach_id INT,
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, coach_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (coach_id) REFERENCES coaches(coach_id)
);

CREATE TABLE challengeparticipants (
  user_id INT,
  challenge_id INT,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, challenge_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id)
);

CREATE TABLE Nutritionists (
  nutritionist_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  bio TEXT,
  specialization VARCHAR(255),
  years_of_experience INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);