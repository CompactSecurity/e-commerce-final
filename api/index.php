<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';

// Basic router
$request_method = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Remove base path segments
$base_path_segments = explode('/', '/e-commerce/api');
$uri = array_slice($uri, count($base_path_segments));

// Route the request
$controller = isset($uri[0]) && $uri[0] !== '' ? $uri[0] : 'home';
$action = isset($uri[1]) && $uri[1] !== '' ? $uri[1] : 'index';
$id = isset($uri[2]) && $uri[2] !== '' ? $uri[2] : null;

// Add these special route handlers
if ($controller === 'auth') {
    require_once __DIR__ . '/controllers/AuthController.php';
    $controller_instance = new AuthController();
    
    switch ($action) {
        case 'register-admin':
            $controller_instance->registerAdmin();
            exit;
        case 'get-admins':
            $controller_instance->getAdmins();
            exit;
        case 'delete-admin':
            $controller_instance->deleteAdmin($id);
            exit;
        case 'update-admin':
            $controller_instance->updateAdmin($id);
            exit;
    }
}

// Add this to your special route handlers section
if ($controller === 'blog') {
    require_once __DIR__ . '/controllers/BlogController.php';
    $controller_instance = new BlogController();
    
    switch ($action) {
        case 'create':
            $controller_instance->create();
            exit;
        case 'get-all':
            $controller_instance->getAll();
            exit;
        case 'delete':
            $controller_instance->delete($id);
            exit;
        case 'update':
            $controller_instance->update($id);
            exit;
        case 'get-by-id':
            $controller_instance->getById($id);
            exit;
    }
}
if ($controller === 'category') {
    require_once __DIR__. '/controllers/CategoryController.php';
    $controller_instance = new CategoryController();

    switch ($action){
        case 'create':
            $controller_instance->create();
            exit;
        case 'get-all':
            $controller_instance->getAll();
            exit;
        case 'delete':
            $controller_instance->delete($id);
            exit;
        case 'update':
            $controller_instance->update($id);
            exit;
        case 'get-by-id': 
            $controller_instance->delete($id);
            exit;
    } 
}

// Load and execute controller
$controller_name = ucfirst($controller) . 'Controller';
$controller_file = __DIR__ . '/controllers/' . $controller_name . '.php';

if (file_exists($controller_file)) {
    require_once $controller_file;
    $controller_instance = new $controller_name();
    if (method_exists($controller_instance, $action)) {
        $controller_instance->$action($id);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Method not found"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "Controller not found"]);
}