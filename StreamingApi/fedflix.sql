-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 04:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fedflix`
--

-- --------------------------------------------------------

--
-- Table structure for table `pelicula`
--

CREATE TABLE `pelicula` (
  `idMovie` int(11) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_lanzamiento` date NOT NULL,
  `duracion` int(11) NOT NULL,
  `director` varchar(20) NOT NULL,
  `genero` varchar(20) NOT NULL,
  `urlPelicula` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pelicula`
--

INSERT INTO `pelicula` (`idMovie`, `titulo`, `descripcion`, `fecha_lanzamiento`, `duracion`, `director`, `genero`, `urlPelicula`, `image`) VALUES
(1, 'cars', 'pelicula de autos', '0000-00-00', 120, 'disney', 'ATP', '', NULL),
(3, 'FNAF', 'pelicula de animatronicos endemoniao', '2023-10-26', 110, 'Emma Tammi', 'APTPM', '', NULL),
(4, 'Eragon', 'pelicula de Dragones', '2010-10-26', 104, 'Sfefen Fangmeier', 'APTD', '', NULL),
(5, 'Como entrenar a tu dragon', 'pelicula de Dragones', '2015-10-26', 104, 'Sfefen Fangmeier', 'APTD', '', NULL),
(6, 'cars 2', 'pelicula de autos 2', '2015-10-05', 110, 'disney', 'infantil', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `serie`
--

CREATE TABLE `serie` (
  `idSerie` int(11) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_lanzamiento` date NOT NULL,
  `temporadas` int(11) NOT NULL,
  `director` varchar(30) NOT NULL,
  `genero` varchar(30) NOT NULL,
  `urlSerie` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `serie`
--

INSERT INTO `serie` (`idSerie`, `titulo`, `descripcion`, `fecha_lanzamiento`, `temporadas`, `director`, `genero`, `urlSerie`, `image`) VALUES
(1, 'the boys', 'serie de superheroes no tan superheroes', '2020-02-21', 3, 'Amazon Prime Video', '+18', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`idMovie`);

--
-- Indexes for table `serie`
--
ALTER TABLE `serie`
  ADD PRIMARY KEY (`idSerie`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `idMovie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `serie`
--
ALTER TABLE `serie`
  MODIFY `idSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
