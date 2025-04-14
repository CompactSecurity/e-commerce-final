<?php

// Configuración de la aplicación
define('APP_NAME', 'E-commerce Seguridad Industrial');
define('APP_URL', 'http://localhost/e-commerce-compact-demo');
define('APP_ROOT', dirname(dirname(__FILE__)));

// Configuración de la API
define('API_VERSION', 'v1');
define('API_URL', APP_URL . '/api/' . API_VERSION);

// Configuración de JWT
define('JWT_SECRET', 'tu_clave_secreta_aqui');
define('JWT_EXPIRE', 3600); // 1 hora en segundos

// Configuración de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Configuración de zona horaria
date_default_timezone_set('America/Lima');

// Configuración de manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Función para formatear respuestas JSON
function jsonResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    return json_encode($response);
}

// Función para sanitizar inputs
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Función para validar email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Función para generar token JWT
function generateJWT($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($payload);
    
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

// Función para verificar token JWT
function verifyJWT($token) {
    try {
        $parts = explode('.', $token);
        if (count($parts) != 3) {
            return false;
        }
        
        $signature = hash_hmac('sha256', $parts[0] . "." . $parts[1], JWT_SECRET, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        if ($base64UrlSignature !== $parts[2]) {
            return false;
        }
        
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
        return $payload;
    } catch (Exception $e) {
        return false;
    }
}
?> 