-- src/db/univers_blog.sql
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 24 juin 2026 à 15:52
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `univers_blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `author_id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  `status` enum('brouillon','publié','suspendu') NOT NULL DEFAULT 'brouillon',
  `views` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_article_author` (`author_id`),
  KEY `fk_article_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `image`, `author_id`, `category_id`, `status`, `views`, `created_at`, `updated_at`) VALUES
(1, 'Découverte d\'une nouvelle exoplanète habitable', 'Des astronomes ont identifié une planète située dans la zone habitable de son étoile, similaire à la Terre. Cette découverte ouvre de nouvelles perspectives révolutionnaires dans la recherche de vie extraterrestre.\n\nL\'exoplanète, baptisée Kepler-452c, présente plusieurs caractéristiques remarquables : taille comparable à celle de la Terre (1,2 fois le diamètre terrestre), située dans la zone habitable de son étoile, température de surface permettant l\'eau liquide, atmosphère potentiellement propice à la vie.\n\nLe télescope spatial James Webb sera utilisé pour analyser en détail la composition atmosphérique de Kepler-452c.', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779709841/h5edcrwdlaenafssaizc.jpg', 2, 2, 'publié', 1247, '2026-03-08 10:00:00', '2026-06-23 09:42:02'),
(2, 'Mission Mars 2026', 'La prochaine mission habitée vers Mars est officiellement planifiée pour 2026. Les équipes de la NASA et de SpaceX travaillent conjointement pour préparer cette aventure historique.', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779709862/rsj8tb61mdgjhs7o71si.jpg', 3, 3, 'publié', 997, '2026-03-05 14:30:00', '2026-05-25 13:51:06'),
(3, 'Le télescope James Webb', 'Brouillon en cours de rédaction sur les dernières découvertes du télescope James Webb et son impact sur notre compréhension de l\'univers.', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779709813/wavedr24fh9ruh2ynpi9.jpg', 4, 1, 'publié', 2, '2026-03-10 09:15:00', '2026-05-25 13:50:20'),
(4, 'Voyage au cœur de la Voie lactée', 'Une équipe internationale publie une carte 3D ultra-précise de notre galaxie, révélant des structures encore inconnues...', 'voie_lactee.jpg', 2, 1, 'brouillon', 780, '2026-04-10 10:30:00', '2026-06-01 09:48:20'),
(5, 'Les robots explorateurs de Titan', 'La NASA confirme le lancement d’un drone autonome capable d’explorer les mers de méthane de Titan...', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779709540/qezgekykmibwpc4zgliv.jpg', 3, 2, 'publié', 1124, '2026-04-11 14:00:00', '2026-06-03 12:33:06'),
(6, 'Les dernières avancées en biotechnologie spatiale 88', 'Des chercheurs développent des cellules capables de résister aux radiations cosmiques, ouvrant la voie à des missions plus longues...', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779709781/kb098gmufn69poeplmiz.jpg', 4, 3, 'publié', 547, '2026-04-12 09:20:00', '2026-05-30 19:54:36'),
(7, 'il était une fois l\'homme', 'Il était une fois… l\'Espace est une série d\'animation française de science-fiction créée par Albert Barillé pour les studios Procidis et Eiken, diffusée initialement de 1982 à 1983.  Composée de 26 épisodes de 25 minutes, elle succède à Il était une fois… l\'Homme en transposant ses personnages emblématiques (comme le professeur Maestro et Pierrot) dans un futur lointain. \n\nL\'intrigue suit les aventures de la Police Spatiale de la Confédération Oméga, dirigée par le colonel Pierre et la présidente Pierrette, qui veille sur la paix interstellaire.  L\'équipe principale, composée du lieutenant Pierrot, de la géologue Psi (Mercedes) et du robot Métro, affronte les menaces extérieures, notamment l\'impérialiste Général Le Teigneux de la constellation de Cassiopée et la mystérieuse race des Humanoïdes contrôlée par le Grand Ordinateur.  La série est reconnue pour sa rigueur scientifique, sa bande originale signée par Michel Legrand et son approche pédagogique mêlée de drame et de mythologie.', 'ariane7.jpg', 1, 5, 'suspendu', 1684, '2026-04-13 08:45:00', '2026-06-10 10:19:56'),
(28, 'test 2', 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1781951370/univers/mhvxhgcravmyuwud0j5m.webp', 25, NULL, 'brouillon', 0, '2026-06-20 12:29:36', '2026-06-22 17:48:06'),
(29, 'article first', 'nothingfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1781954423/univers/at8mydrfigbw58yckjve.webp', 25, NULL, 'publié', 4, '2026-06-20 13:20:44', '2026-06-23 10:58:34'),
(30, 'ca marche youpi youpi', 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1782163518/univers/sxe4exnnrpkwr0vykryt.jpg', 25, NULL, 'publié', 3, '2026-06-22 23:25:51', '2026-06-23 10:58:32');

-- --------------------------------------------------------

--
-- Structure de la table `article_categorie`
--

DROP TABLE IF EXISTS `article_categorie`;
CREATE TABLE IF NOT EXISTS `article_categorie` (
  `id_article` int UNSIGNED NOT NULL,
  `id_categorie` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id_article`,`id_categorie`),
  UNIQUE KEY `unique_article` (`id_article`),
  KEY `fk_ac_categorie` (`id_categorie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `article_categorie`
--

INSERT INTO `article_categorie` (`id_article`, `id_categorie`) VALUES
(1, 1),
(2, 3),
(3, 1),
(4, 1),
(5, 2),
(6, 4),
(7, 4),
(28, 2),
(29, 4),
(30, 1);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(6, 'Actualités spatiales'),
(1, 'Astronomie'),
(4, 'Espace'),
(2, 'Exoplanètes'),
(3, 'Mars'),
(5, 'NASA');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci,
  `external_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `start_time`, `end_time`, `location`, `image`, `external_url`, `created_at`) VALUES
(1, 'Lancement Mission Alphas', '2001-04-04', '08:00:00', '09:30:00', 'Cap Canaveral, USA', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779656065/phzb8b8htlp6ixqnosjs.jpg', 'https://nasa.gov/mission-alpha', '2026-05-22 08:36:07'),
(2, 'Conférence Exploration Mars', '2026-04-30', '14:00:00', '17:00:00', 'Paris, France', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779656077/ifsfwqel9bi8pppxqm5l.jpg', 'https://esa.int/mars-conference', '2026-05-22 08:36:07'),
(3, 'Déploiement Satellite Orbital', '2026-05-19', '10:15:00', '11:00:00', 'Kourou, Guyane', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779656088/k5no0gyoaktz3fkeffvf.jpg', 'https://spaceflight.com/satellite-deploy', '2026-05-22 08:36:07'),
(4, 'Lancement Ariane 6', '2026-08-12', '14:00:00', NULL, 'Kourou', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1781078812/univers/lhptirxykrq3tbqtvkbe.jpg', 'https://esa.int', '2026-05-22 08:36:07'),
(5, 'Forum Technologie Spatiale', '2026-06-17', '09:00:00', '18:00:00', 'Lyon, France', 'https://res.cloudinary.com/dqm1kobls/image/upload/v1779656137/f5vrmluyuoqwsb0j6o9p.jpg', 'https://spaceforum.org/2026', '2026-05-22 08:36:07');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('rédacteur','administrateur') NOT NULL DEFAULT 'rédacteur',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `must_change_password` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `name`, `email`, `password`, `role`, `created_at`, `must_change_password`) VALUES
(1, 'Administrateur', 'admin@univers-blog.fr', '$2y$10$exampleHashAdminxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'administrateur', '2026-03-21 11:12:01', 0),
(2, 'Dr. Sophie Martin', 'sophie.martin@univers-blog.fr', '$2y$10$exampleHashSophiexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'rédacteur', '2026-03-21 11:12:01', 0),
(3, 'Jean Dupont', 'jean.dupont@univers-blog.fr', '$2y$10$exampleHashJeanxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'rédacteur', '2026-03-21 11:12:01', 0),
(4, 'Marie Laurent', 'marie.laurent@univers-blog.fr', '$2y$10$exampleHashMariexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'rédacteur', '2026-03-21 11:12:01', 0),
(5, 'nashi', 'nashi@univers-blog.fr', '$2y$10$exampleHashNashixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'rédacteur', '2026-03-21 11:12:01', 0),
(7, 'Nashi19', 'nashi@gmail.com', '$2b$12$oyXG4ogiRVHTqNE4xYIttOnZ5zIyc.kj6g0DqnSFhaj9y2m6rnWz6', 'administrateur', '2026-04-13 15:32:15', 0),
(25, 'test02', 'kidep51055@preparmy.com', '$2b$12$eZUjyqtRqaC.9fu1bqY/YuGRF8bcHKzDaXFf5emD2mdum3K.fQ5fK', 'rédacteur', '2026-06-20 11:44:43', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_article_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_article_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `article_categorie`
--
ALTER TABLE `article_categorie`
  ADD CONSTRAINT `fk_ac_article` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ac_categorie` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
