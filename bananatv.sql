-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2023 a las 14:55:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bananatv`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `idContenido` int(11) NOT NULL,
  `comentario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`idContenido`, `comentario`) VALUES
(8, 'muy linda la peli'),
(8, 'asd'),
(11, 'lola loca'),
(13, 'los minioons'),
(11, 'hola '),
(8, 'ta buena esta de iron man');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `idUser` int(11) NOT NULL,
  `idContenido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`idUser`, `idContenido`) VALUES
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1),
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

CREATE TABLE `pelicula` (
  `idMovie` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_lanzamiento` date NOT NULL,
  `duracion` int(11) NOT NULL,
  `productor` text NOT NULL,
  `director` text NOT NULL,
  `genero` text NOT NULL,
  `urlPelicula` text DEFAULT NULL,
  `banner` text DEFAULT NULL,
  `imagen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`idMovie`, `titulo`, `descripcion`, `fecha_lanzamiento`, `duracion`, `productor`, `director`, `genero`, `urlPelicula`, `banner`, `imagen`) VALUES
(8, 'Iron Man', 'El multimillonario fabricante de armas Tony Stark debe enfrentarse a su turbio pasado después de sufrir un accidente con una de sus armas. Equipado con una armadura de última generación tecnológica, se convierte en \'El hombre de hierro\' para combatir el mal a escala global.', '2008-04-30', 126, 'Marvel Studios', 'Jon Favreau', 'Acción, Ciencia Ficción', NULL, 'https://firebasestorage.googleapis.com/v0/b/integrador-pow---loam.appspot.com/o/ironman1_poster.jpeg?alt=media&token=78bfc87f-878d-4e9f-9146-a18dfec74559', 'https://firebasestorage.googleapis.com/v0/b/integrador-pow---loam.appspot.com/o/wp2547005-iron-man-1-wallpaper.jpg?alt=media&token=ead913e2-8060-4822-b472-a414bd020d65'),
(10, 'asd', 'ads', '2023-11-02', 0, '', 'wada', 'hjfghk', 'ghjkf', NULL, NULL),
(11, 'La vaca Lola en Peli', 'una vaca muy lola', '2023-12-06', 120, 'el torito', 'el torito rodriguez', 'infantil', NULL, NULL, NULL),
(13, 'Los minions', 'enenos amarillos', '2023-12-07', 0, 'asd', 'asdaa', 'infantil', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `idPlan` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `precio` float NOT NULL,
  `beneficios` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`idPlan`, `nombre`, `precio`, `beneficios`) VALUES
(1, 'Bassic', 1500, 'Beneficios que entrega el plan Bassic'),
(2, 'Medium', 2000, 'Beneficios que entrega el plan Medium'),
(3, 'Premium', 2500, 'Beneficios que entrega el plan Premium');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `serie`
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
-- Volcado de datos para la tabla `serie`
--

INSERT INTO `serie` (`idSerie`, `titulo`, `descripcion`, `fecha_lanzamiento`, `temporadas`, `director`, `genero`, `urlSerie`, `image`) VALUES
(1, 'vaca lola', 'infantil', '2023-12-08', 12, 'toro', 'infantil', 'asd', 'asdsd'),
(3, 'la casa de papel', 'una casa que es de papel', '2023-10-18', 12, 'casa', 'accion', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `nroTarjeta` int(11) NOT NULL,
  `vencimiento` varchar(30) NOT NULL,
  `ccv` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`nroTarjeta`, `vencimiento`, `ccv`, `idUsuario`) VALUES
(123, '11/28', 456, 21),
(12342, '35/123', 124, 27),
(123456, '11/12', 565, 26),
(336699, '12/32', 326, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUser` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` text NOT NULL,
  `tipoPlan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUser`, `nombre`, `mail`, `password`, `token`, `tipoPlan`) VALUES
(1, 'blas', 'blas@koko.com', '$2a$10$NOACLazFqGcBEyrBVoIuYOd3LWW2OsEhvoNAf7KVlUyE4ij/IlYf6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y', 0),
(21, 'blasito', 'blasito@koko.com', '$2a$10$4Jr24S5kU0.NWGX2mfqK6OtS0wVX3x.RfxTMv6ZFvayco/VqzpHo.', '', 1),
(24, 'Pepe', 'pepe@gmail.com', '$2a$10$J86yirzu0wgkxeJbrRO31.vBVSZTj78HaHRt1m45/5AIBXB/4UrZK', '', 3),
(26, 'as', 'asd@assd.com', '$2a$10$JrkriUOPO5LJ4VL/pQc2culbs23QoCswfaLYMzThJ3KepIfzwu4B2', '', 1),
(27, 'asldpas', 'plaspd@gmail.com', '$2a$10$ptY79IwAmDh6D5c/zD784.5yPflS23nmoVRmLmsWITtCZtKj7r38u', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhc2xkcGFzIiwiaWF0IjoxNzAwNzcyMjE4fQ.z5vXpGx2-1tW8rP9PPqsAHZZhYpwQbdwDFpl1GfMIRw', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`idMovie`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`idPlan`);

--
-- Indices de la tabla `serie`
--
ALTER TABLE `serie`
  ADD PRIMARY KEY (`idSerie`);

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`nroTarjeta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `idMovie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `idPlan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `serie`
--
ALTER TABLE `serie`
  MODIFY `idSerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  MODIFY `nroTarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336700;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
