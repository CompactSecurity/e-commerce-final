-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 16:00:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE `blog` (
  `id_blog` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `excerpt` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `read_time` varchar(20) DEFAULT NULL,
  `imagen_portada` varchar(255) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp(),
  `estado` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`id_blog`, `titulo`, `slug`, `contenido`, `excerpt`, `author`, `category`, `read_time`, `imagen_portada`, `fecha_publicacion`, `estado`, `is_featured`) VALUES
(45, '5 prácticas esenciales para prevenir accidentes laborales en la industria', '5-pr-cticas-esenciales-para-prevenir-accidentes-laborales-en-la-industria', 'En cualquier entorno industrial, la seguridad de los trabajadores debe ser la prioridad número uno. Aunque los riesgos no se pueden eliminar por completo, sí pueden reducirse drásticamente con la implementación de protocolos adecuados y el compromiso de todos los niveles de la organización. A continuación, te presentamos 5 prácticas esenciales que toda empresa industrial debe aplicar para evitar accidentes y crear un entorno de trabajo más seguro:', 'En cualquier entorno industrial, la seguridad de los trabajadores debe ser la prioridad número uno. Aunque los riesgos no se pueden eliminar por completo, sí pueden reducirse drásticamente con la implementación de protocolos adecuados y el compromiso de todos los niveles de la organización. A continuación, te presentamos 5 prácticas esenciales que toda empresa industrial debe aplicar.', 'José Edgardo', 'Consejos Laborales', '6 min de Lectura', '/uploads/blog/682e56e23cb4f_6806c33ec7804_ChatGPT_Image_21_abr_2025__05_14_09_p.m..png', '2025-05-21 17:42:42', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id_carrito` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `estado` enum('activo','completado','abandonado') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `slug`, `descripcion`, `imagen`, `estado`) VALUES
(3, 'Protección para la Cabeza', 'protección-para-la-cabeza', 'Cascos y accesorios para la cabeza', '', 1),
(4, 'Protección Auditiva', 'protección-auditiva', 'Protectores auditivos y tapones', '', 1),
(5, 'Protección Respiratoria', 'protección-respiratoria', 'Mascarillas y respiradores', '/e-commerce/api/uploads/categorias/67ffe2d941b1b_1.png', 1),
(6, 'Protección para Manos', 'protección-para-manos', 'Guantes de seguridad y protección', '', 1),
(7, 'Protección para Pies', 'protección-para-pies', 'Calzado de seguridad industrial', '', 1),
(8, 'Protección Facial', 'protección-facial', 'Caretas y gafas de protección', '', 1),
(9, 'Protección para Caídas', 'protección-para-caídas', 'Arneses y equipos anti-caídas', '', 1),
(10, 'Ropa de trabajo y protección', 'ropa-de-trabajo-y-protección', 'Ropa Industrial', '', 1),
(11, 'Protección Visual', 'protección-visual', 'Protección visual para la seguridad', '', 1),
(13, 'Otro', 'otro', 'Otro', '', 1),
(14, 'Señaleticas', 'señaleticas', 'Señaleticas para ti', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_productos`
--

CREATE TABLE `imagenes_productos` (
  `id_imagen` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `orden` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_carrito`
--

CREATE TABLE `items_carrito` (
  `id_item` int(11) NOT NULL,
  `id_carrito` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_pedido`
--

CREATE TABLE `items_pedido` (
  `id_item` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `logo` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `nombre`, `slug`, `descripcion`, `logo`, `estado`) VALUES
(11, '3M', NULL, '3M', 'a', 1),
(12, 'Stanley', NULL, 'Stanley', '', 1),
(13, 'Truper', NULL, 'Truper', '', 1),
(14, 'Kamasa', NULL, 'Kamasa', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `merchant_order_id` varchar(255) NOT NULL,
  `preference_id` varchar(255) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','procesando','enviado','entregado','cancelado') DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL,
  `direccion_envio` text NOT NULL,
  `metodo_pago` varchar(50) NOT NULL,
  `preference_id` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT NULL,
  `merchant_order_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_items`
--

CREATE TABLE `pedido_items` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `precio_oferta` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `imagen_principal` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `destacado` tinyint(1) DEFAULT 0,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `cotizable` tinyint(4) DEFAULT 0,
  `agregable_carrito` tinyint(4) DEFAULT 0,
  `id_marca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_categoria`, `nombre`, `slug`, `descripcion`, `precio`, `precio_oferta`, `stock`, `imagen_principal`, `estado`, `destacado`, `fecha_creacion`, `cotizable`, `agregable_carrito`, `id_marca`) VALUES
(81, 5, 'Mascara Reutilizable de silicona', 'mascara-reutilizable-de-silicona', 'La mejor mascara/respirador para tu cuidado personal y de tus trabajadores, hecha en Peru.', 120.00, 150.00, 20, '/uploads/productos/68093c66758d3_mascara.jpg', 1, 1, '2025-04-23 14:15:50', 0, 1, 11),
(82, 7, 'Botas Industriales SteelToe Pro', 'botas-industriales-steeltoe-pro', 'Botas con puntera de acero y suela antideslizante, perfectas para obras y fábricas.', 165.90, 175.00, 30, '/uploads/productos/68093d7bb6b12_zapar.jpg', 1, 1, '2025-04-23 14:20:27', 0, 1, 14),
(83, 3, 'Casco Industrial SafeCap Pro', 'casco-industrial-safecap-pro', 'Casco con suspensión interna y ranuras para accesorios de protección facial o auditiva.', 0.00, 0.00, 0, '/uploads/productos/68094045b1f93_casco.jpg', 1, 1, '2025-04-23 14:32:21', 1, 0, 12),
(85, 10, 'Camisa BlizFlame V1', 'camisa-blizflame-v1', 'Diseñada para entornos de alto riesgo, la Camisa BlizFlame V1 ofrece una combinación ideal de seguridad, confort y durabilidad. Fabricada con materiales ignífugos certificados, esta prenda brinda una excelente resistencia al fuego y al calor, protegiendo al usuario en tareas industriales exigentes. Su diseño ergonómico permite libertad de movimiento, mientras que sus costuras reforzadas y bolsillos funcionales la convierten en una prenda confiable para el trabajo diario.', 200.00, 300.00, 90, '/uploads/productos/680953445bf8d_Camisa-Bizflame-88-12-300x300.jpg', 1, 1, '2025-04-23 15:53:24', 0, 1, 14),
(86, 6, 'Guantes de Electricista ', 'guantes-de-electricista', 'Los Guantes de Electricista están diseñados para brindar una barrera eficaz contra riesgos eléctricos en tareas de baja y media tensión. Fabricados con materiales dieléctricos de alta calidad, estos guantes ofrecen excelente aislamiento, resistencia al desgaste y comodidad durante largas jornadas de trabajo.\r\nIdeales para electricistas, técnicos de mantenimiento, y profesionales que trabajan con equipos energizados.', 0.00, 0.00, 0, '/uploads/productos/68095b5baad40_Guante-Velsur-Modelo-Ultraflex-PU-300x300.jpg', 1, 0, '2025-04-23 16:27:55', 1, 0, 14),
(90, 10, 'Malla Liviana', 'malla-liviana', 'Ligera, versátil y resistente.\r\nLa Malla Liviana es una solución práctica para delimitaciones temporales, señalización de áreas de trabajo o protección en obras de construcción. Fabricada en polietileno de alta densidad, ofrece buena resistencia al desgarro y a la intemperie, sin comprometer la facilidad de transporte e instalación.\r\nIdeal para usos en obras viales, eventos, cerramientos provisorios y más.\r\n\r\n', 0.00, 0.00, 0, '/uploads/productos/680960fcb7644_Malla-Liviana-300x300.jpg', 1, 0, '2025-04-23 16:51:56', 1, 0, 11),
(91, 4, 'Orejeras V29', 'orejeras-v29', 'Diseñadas para ofrecer una protección auditiva confiable en entornos ruidosos. Las V29 cuentan con almohadillas suaves y confortables que aseguran un ajuste ergonómico durante largas jornadas de trabajo. Su diseño liviano y ajustable proporciona una excelente atenuación del ruido sin comprometer la comodidad. Ideales para uso en industrias, talleres, construcción y actividades al aire libre donde el control del ruido es esencial.', 95.00, 100.00, 20, '/uploads/productos/680964f0570e3_orejeras.jpg', 1, 1, '2025-04-23 17:08:48', 0, 1, 11),
(94, 5, 'Respirador Reutilizable', 'respirador-reutilizable', 'Diseñado para brindar protección efectiva contra partículas, vapores y gases según el tipo de filtro utilizado. Este respirador reutilizable se ajusta cómodamente al rostro gracias a su diseño ergonómico y material flexible. Ideal para entornos industriales, trabajos con químicos, pintura, construcción o agricultura. Compatible con filtros intercambiables, es una opción económica y ecológica para el uso prolongado, sin sacrificar la seguridad respiratoria.', 75.00, 90.00, 50, '/uploads/productos/68096c157632b_respirador.jpg', 1, 1, '2025-04-23 17:39:17', 0, 1, 13),
(95, 8, 'Mascara de Soldar', 'mascara-de-soldar', 'Protege tu rostro y visión con esta máscara para soldar de alta resistencia, diseñada para trabajos de soldadura eléctrica, MIG, TIG o por arco. Cuenta con visor abatible o filtro automático (según el modelo), que se oscurece al detectar el arco eléctrico, ofreciendo comodidad y protección instantánea. Su estructura liviana y ajustable permite largas jornadas de uso sin fatiga. Ideal para talleres, industrias metalúrgicas y trabajos de mantenimiento.', 0.00, 0.00, 0, '/uploads/productos/68096cee743d7_mascara de soldas.jpeg', 1, 0, '2025-04-23 17:42:54', 1, 0, 11),
(117, 10, 'Camiseta de Alta Visibilidad PW3', 'asdasd', 'La Camiseta de Alta Visibilidad de Manga Larga PW3 combina seguridad, confort y estilo moderno.\r\nFabricada con tejidos transpirables y ligeros, ofrece máxima comodidad durante largas jornadas laborales.\r\nSu diseño de alta visibilidad, con cintas reflectantes segmentadas, proporciona una excelente protección en entornos de baja iluminación o alto riesgo.\r\nIdeal para trabajadores de la construcción, logística, mantenimiento vial y sectores industriales que requieren ropa certificada de seguridad.', 120.00, 160.00, 20, '/uploads/productos/682de42890dcf_Camiseta-de-Alta-Visibilidad-de-Manga-Larga-PW3.jpg', 0, 0, '2025-05-21 09:29:43', 0, 1, 14),
(118, 10, 'Camiseta de Alta Visibilidad PW3', 'camiseta-de-alta-visibilidad-pw3', 'La Camiseta de Alta Visibilidad de Manga Larga PW3 combina seguridad, confort y estilo moderno.\r\nFabricada con tejidos transpirables y ligeros, ofrece máxima comodidad durante largas jornadas laborales.\r\nSu diseño de alta visibilidad, con cintas reflectantes segmentadas, proporciona una excelente protección en entornos de baja iluminación o alto riesgo.\r\nIdeal para trabajadores de la construcción, logística, mantenimiento vial y sectores industriales que requieren ropa certificada de seguridad.', 200.00, 300.00, 80, '/uploads/productos/682de6f160c25_Camiseta-de-Alta-Visibilidad-de-Manga-Larga-PW3.jpg', 1, 0, '2025-05-21 09:45:05', 0, 1, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `rol` enum('admin','cliente') DEFAULT 'cliente',
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `email`, `password`, `telefono`, `direccion`, `rol`, `fecha_registro`, `estado`) VALUES
(8, 'Admin Jose', 'Edgardo', 'administradorCompact@gmail.com', '$2y$10$NfK9WsBtaklNipYdxeRQU.haTBtx76C4PtadxTCW2S9PIylt20Ofy', NULL, NULL, 'admin', '2025-04-14 12:19:17', 1),
(60, 'Test', 'torres', 'testtorres@gmail.com', '$2y$10$523ZJv9YNPRImfqfmWFQYOde0gk5hPEv4Hn1YI7BnwXJcNMPRRN3O', '976243901', NULL, 'cliente', '2025-05-26 08:56:30', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id_blog`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_carrito` (`id_carrito`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `items_pedido`
--
ALTER TABLE `items_pedido`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pedido_items`
--
ALTER TABLE `pedido_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `id_blog` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `items_pedido`
--
ALTER TABLE `items_pedido`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedido_items`
--
ALTER TABLE `pedido_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD CONSTRAINT `imagenes_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD CONSTRAINT `items_carrito_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id_carrito`) ON DELETE CASCADE,
  ADD CONSTRAINT `items_carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `items_pedido`
--
ALTER TABLE `items_pedido`
  ADD CONSTRAINT `items_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `items_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `pedido_items`
--
ALTER TABLE `pedido_items`
  ADD CONSTRAINT `pedido_items_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `pedido_items_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
