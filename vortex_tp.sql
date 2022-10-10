-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-10-2022 a las 00:48:50
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vortex_tp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_c` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_c`, `category_name`) VALUES
(1, 'Muebles de cocina'),
(2, 'Smartphone'),
(3, 'Monitor'),
(5, 'Billeteras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `total_price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_order`, `total_price`) VALUES
(2, '0.00'),
(3, '0.00'),
(4, '0.00'),
(5, '0.00'),
(6, '0.00'),
(7, '504800.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_p` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `shipping` varchar(5) NOT NULL,
  `description` varchar(50) NOT NULL,
  `product_condition` varchar(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_p`, `product_name`, `price`, `shipping`, `description`, `product_condition`, `category`) VALUES
(2, 'Samsung S22+', 40000, 'true', 'Smartphone marca samsung', 'used', 2),
(4, 'Sillon negro', 6200, 'true', 'Sillon grande color negro', 'new', 1),
(5, 'Monitor', 10000, '0', 'Monitor samsung 24 pulgadas', 'used', 3),
(6, 'Billetera', 2400, '1', 'Billetera de cuero sintetico', 'new', 5),
(7, 'Prueba', 2400, '1', 'Billetera de cuero sintetico', '', 0),
(8, 'Prueba', 2400, '1', 'Billetera de cuero sintetico', '', 0),
(9, 'Prueba', 2400, '1', 'Billetera de cuero sintetico', 'new', 2),
(10, 'Prueba', 2400, '1', 'Billetera de cuero sintetico', '', 0),
(11, 'Prueba', 2400, '1', 'Billetera de cuero sintetico', 'new', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_order`
--

CREATE TABLE `product_order` (
  `id_product` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_order`
--

INSERT INTO `product_order` (`id_product`, `id_order`, `quantity`) VALUES
(2, 7, 10),
(5, 7, 10),
(3, 7, 2),
(7, 7, 1),
(8, 7, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_c`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_p`),
  ADD KEY `FK_Category` (`category`) USING BTREE;

--
-- Indices de la tabla `product_order`
--
ALTER TABLE `product_order`
  ADD KEY `FK_PRODUCT` (`id_product`),
  ADD KEY `FK_ORDER` (`id_product`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_c` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_p` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
