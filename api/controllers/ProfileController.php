<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Response.php';

class ProfileController {
    private $db;
    private $user;
    private $response;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
        header('Access-Control-Allow-Credentials: true');

        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
        $this->response = new Response();
    }

    public function getProfile() {
        try {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            // Debug session data
            error_log('Session data in getProfile: ' . print_r($_SESSION, true));
            
            // Check if user is in session - adjust this based on your actual session structure
            if (!isset($_SESSION['id_usuario']) && !isset($_SESSION['user'])) {
                error_log('No user session found');
                $this->response->sendError(401, "Usuario no autenticado");
                return;
            }

            // Get user ID from session based on your session structure
            $userId = isset($_SESSION['id_usuario']) ? $_SESSION['id_usuario'] : 
                     (isset($_SESSION['user']['id']) ? $_SESSION['user']['id'] : 
                     (isset($_SESSION['user']['id_usuario']) ? $_SESSION['user']['id_usuario'] : null));
            
            if (!$userId) {
                error_log('No user ID found in session');
                $this->response->sendError(401, "Usuario no autenticado");
                return;
            }
            
            error_log('User ID from session: ' . $userId);
            
            $profileData = $this->user->getProfileData($userId);
            
            if (!$profileData) {
                error_log('No profile data found for user: ' . $userId);
                $this->response->sendError(404, "Perfil no encontrado");
                return;
            }

            $this->response->sendSuccess(200, [
                'profile' => $profileData,
                'orders' => $this->user->getOrders($userId),
                'addresses' => $this->user->getAddresses($userId)
            ]);

        } catch (Exception $e) {
            error_log("Error in getProfile: " . $e->getMessage());
            $this->response->sendError(500, "Error al obtener el perfil: " . $e->getMessage());
        }
    }

    public function updateProfile() {
        try {
            if (!isset($_SESSION['user'])) {
                $this->response->sendError(401, "Usuario no autenticado");
                return;
            }

            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data) {
                $this->response->sendError(400, "Datos inválidos");
                return;
            }

            $userId = $_SESSION['user']['id'];
            
            if ($this->user->updateProfile($userId, $data)) {
                // Update session data
                $_SESSION['user']['nombre'] = $data['nombre'];
                $_SESSION['user']['apellidos'] = $data['apellidos'];
                $_SESSION['user']['email'] = $data['email'];
                
                $this->response->sendSuccess(200, [
                    "mensaje" => "Perfil actualizado exitosamente",
                    "usuario" => $_SESSION['user']
                ]);
            } else {
                $this->response->sendError(500, "Error al actualizar el perfil");
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error al actualizar el perfil: " . $e->getMessage());
        }
    }

    public function updateAddress() {
        try {
            if (!isset($_SESSION['user'])) {
                $this->response->sendError(401, "Usuario no autenticado");
                return;
            }

            $data = json_decode(file_get_contents("php://input"), true);
            $userId = $_SESSION['user']['id'];

            if (!$data || !isset($data['direccion']) || !isset($data['referencia'])) {
                $this->response->sendError(400, "Datos de dirección incompletos");
                return;
            }

            // Here you would implement the address update logic
            // This is just a placeholder implementation
            $this->response->sendSuccess(200, [
                "mensaje" => "Dirección actualizada exitosamente"
            ]);
        } catch (Exception $e) {
            $this->response->sendError(500, "Error al actualizar la dirección: " . $e->getMessage());
        }
    }
}