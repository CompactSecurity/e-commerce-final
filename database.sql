

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




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
(28, 'Importancia del Equipo de Protección Personal en el Trabajo Industrial', 'importancia-del-equipo-de-protecci-n-personal-en-el-trabajo-industrial', 'En los entornos industriales, los trabajadores están expuestos a una serie de riesgos físicos, químicos y biológicos que pueden afectar su salud y seguridad. El uso de Equipos de Protección Personal (EPP) no solo es una medida recomendada, sino una obligación legal en la mayoría de los países.\r\n\r\nLos EPP incluyen elementos como cascos, guantes, gafas de seguridad, mascarillas, protección auditiva y calzado especial. Elegir el equipo adecuado y capacitar al personal en su uso correcto es esencial para minimizar los riesgos laborales.\r\n\r\nAdemás, las empresas deben realizar inspecciones periódicas para asegurarse de que el equipo esté en buenas condiciones y cumpla con las normativas vigentes. La cultura de la prevención es clave para reducir accidentes y enfermedades profesionales.', 'El uso correcto del Equipo de Protección Personal (EPP) puede significar la diferencia entre una jornada laboral segura y un accidente. Aquí te explicamos por qué su implementación debe ser una prioridad en cualquier entorno industrial.', 'Pedro Torres', 'EPP', '4 min de Lectura', '/api/uploads/blog/680673651373b_Captura_de_pantalla_2025_04_07_111227.png', '2025-04-21 11:33:41', 1, 0),
(30, '5 prácticas esenciales para prevenir accidentes laborales en la industria', '5-pr-cticas-esenciales-para-prevenir-accidentes-laborales-en-la-industria', 'En cualquier entorno industrial, la seguridad de los trabajadores debe ser la prioridad número uno. Aunque los riesgos no se pueden eliminar por completo, sí pueden reducirse drásticamente con la implementación de protocolos adecuados y el compromiso de todos los niveles de la organización.\r\n\r\nA continuación, te presentamos 5 prácticas esenciales que toda empresa industrial debe aplicar para evitar accidentes y crear un entorno de trabajo más seguro:', '\r\n\r\nLa prevención de accidentes en entornos industriales no depende solo del equipo utilizado, sino de la implementación de buenas prácticas y una cultura de seguridad sólida. Estas 5 acciones clave pueden marcar la diferencia entre un entorno riesgoso y uno verdaderamente seguro.', 'Jose Edgardo', 'Consejos Laborales', '6 min de Lectura', '/api/uploads/blog/6806c33ec7804_ChatGPT_Image_21_abr_2025__05_14_09_p.m..png', '2025-04-21 17:14:22', 1, 0),
(31, 'La importancia del uso correcto de los EPP en el entorno laboral', 'la-importancia-del-uso-correcto-de-los-epp-en-el-entorno-laboral', 'En el ámbito de la seguridad industrial, los Equipos de Protección Personal (EPP) son elementos fundamentales para preservar la integridad física de los trabajadores. Su correcta selección, uso y mantenimiento son claves para reducir al mínimo los riesgos asociados a tareas de alto impacto.\r\n\r\n¿Qué son los EPP?\r\nLos EPP son dispositivos, accesorios o vestimenta que protegen al trabajador contra riesgos específicos, como cortes, caídas, quemaduras, exposición a químicos, ruidos extremos, entre otros. Algunos ejemplos comunes incluyen cascos, guantes, gafas de seguridad, protectores auditivos, arneses y mascarillas.\r\n\r\nErrores comunes en su uso:\r\nA pesar de su importancia, uno de los problemas más comunes es el uso inadecuado o el desconocimiento del equipo requerido para cada tipo de tarea. Algunos trabajadores no ajustan correctamente los cascos, usan guantes que no están certificados o simplemente omiten su uso por incomodidad o falta de supervisión.\r\n\r\nBuenas prácticas para fomentar el uso del EPP:\r\n\r\nCapacitación continua sobre los riesgos del entorno y cómo prevenirlos.\r\n\r\nSupervisión activa por parte de los responsables de seguridad.\r\n\r\nInspección periódica del estado de los equipos.\r\n\r\nInvolucrar a los trabajadores en la elección del EPP para mejorar la comodidad y aceptación.\r\n\r\nConclusión:\r\nEl EPP es la última línea de defensa entre el trabajador y un accidente. Invertir en una cultura de seguridad y promover el uso adecuado del EPP no solo evita sanciones legales, sino que salva vidas.', '\r\nEl uso de Equipos de Protección Personal (EPP) no solo es obligatorio en muchos sectores industriales, sino que representa una barrera esencial entre los trabajadores y los riesgos potenciales del entorno. En este artículo analizamos por qué su uso adecuado puede marcar la diferencia entre un accidente y una jornada segura.', 'Jose Edgardo', 'EPP', '3 min de Lectura', '/api/uploads/blog/6806cd80ef240_1.png', '2025-04-21 17:58:08', 1, 0);

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
(11, 'Protección Visual', 'protección-visual', 'Protección visual para la seguridad', '', 1);

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
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','procesando','enviado','entregado','cancelado') DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL,
  `direccion_envio` text NOT NULL,
  `metodo_pago` varchar(50) NOT NULL
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
(84, 6, 'Guantes Anticorte GripFlex N5', 'guantes-anticorte-gripflex-n5', 'Guantes con recubrimiento de nitrilo y resistencia nivel 5 al corte.', 80.00, 75.00, 12, '/uploads/productos/6809414b9115f_guante.jpg', 1, 1, '2025-04-23 14:36:43', 0, 1, 13),
(85, 10, 'Camisa BlizFlame V1', 'camisa-blizflame-v1', 'Diseñada para entornos de alto riesgo, la Camisa BlizFlame V1 ofrece una combinación ideal de seguridad, confort y durabilidad. Fabricada con materiales ignífugos certificados, esta prenda brinda una excelente resistencia al fuego y al calor, protegiendo al usuario en tareas industriales exigentes. Su diseño ergonómico permite libertad de movimiento, mientras que sus costuras reforzadas y bolsillos funcionales la convierten en una prenda confiable para el trabajo diario.', 200.00, 300.00, 90, '/uploads/productos/680953445bf8d_Camisa-Bizflame-88-12-300x300.jpg', 1, 1, '2025-04-23 15:53:24', 0, 1, 14);

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
(32, 'Pedro', 'Torres', 'petusotwo@gmail.com', '$2y$10$hD6kQZ/1zvwIGBtUoMz/h.TL6oYObb8deIf9woxdPZ/Z7lS8nv5yC', NULL, NULL, 'cliente', '2025-04-14 18:05:47', 1),
(36, 'Pedro', 'Torres', 'pepapig@gmail.com', '$2y$10$aovXSxV22m9mCELHaGDdKOTlAlMJA3.ktOCECUmALholQA0G.I7D6', NULL, NULL, 'cliente', '2025-04-16 10:55:14', 1),
(38, 'Pedro', 'Torres', 'pepapig2@gmail.com', '$2y$10$DWrjIByM/BiGQTIQkFh7bOV8BDZqAFJM7bfxFkbajDPPMz/RDPely', NULL, NULL, 'cliente', '2025-04-16 14:15:13', 1),
(39, 'Pedro', 'Torres', 'pedrocespedes21@gmail.com', '$2y$10$EutKpYrlMyku/KMeNC2dKuIDsDAdELCNl8XMPsnfDrZ3UxASqh6iy', NULL, NULL, 'cliente', '2025-04-16 18:30:08', 1),
(40, 'Juan', 'Garcia', 'perez90@gmail.com', '$2y$10$L5raa9KtDWPQodjqnJtSh.Y/j3G2fhW89HRZ/Qd.oPNM5c8kc.sSG', NULL, NULL, 'admin', '2025-04-16 18:31:25', 1);

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
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

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
  MODIFY `id_blog` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

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
