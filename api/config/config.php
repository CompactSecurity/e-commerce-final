<?php
// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define constants
define('BASE_URL', 'http://localhost/e-commerce/api');
define('UPLOAD_PATH', __DIR__ . '/../uploads');

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");