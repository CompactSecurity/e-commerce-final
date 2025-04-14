<?php
// Cargar configuración
require_once '../config/config.php';
require_once '../config/database.php';

// Obtener la URL solicitada
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = '/e-commerce-compact-demo/backend/public';
$path = str_replace($base_path, '', $request_uri);
$path = trim($path, '/');

// Dividir la ruta en segmentos
$segments = explode('/', $path);

// Determinar el controlador y la acción
$controller = !empty($segments[0]) ? $segments[0] : 'home';
$action = !empty($segments[1]) ? $segments[1] : 'index';
$params = array_slice($segments, 2);

// Cargar el controlador correspondiente
$controller_file = '../controllers/' . ucfirst($controller) . 'Controller.php';

if (file_exists($controller_file)) {
    require_once $controller_file;
    $controller_class = ucfirst($controller) . 'Controller';
    $controller_instance = new $controller_class();
    
    if (method_exists($controller_instance, $action)) {
        call_user_func_array([$controller_instance, $action], $params);
    } else {
        // Acción no encontrada
        header("HTTP/1.0 404 Not Found");
        echo jsonResponse(false, 'Acción no encontrada');
    }
} else {
    // Controlador no encontrado
    header("HTTP/1.0 404 Not Found");
    echo jsonResponse(false, 'Controlador no encontrado');
}
?> 