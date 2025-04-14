<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Response.php';

class AuthController {
    private $db;
    private $user;
    private $response;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
        $this->response = new Response();
    }

    public function login() {
        $input = file_get_contents("php://input");
        $data = json_decode($input);
        
        // Debug incoming data
        error_log('Raw input: ' . $input);
        error_log('Decoded data: ' . print_r($data, true));
        
        if($data === null) {
            $this->response->sendError(400, "Datos inválidos o mal formateados");
            return;
        }

        if(!isset($data->email) || !isset($data->password) || 
           empty($data->email) || empty($data->password)) {
            $this->response->sendError(400, "Email y contraseña son requeridos");
            return;
        }

        $this->user->email = $data->email;
        
        if($this->user->checkLogin()) {
            if(password_verify($data->password, $this->user->password)) {
                $_SESSION['user'] = [
                    'id' => $this->user->id_usuario,
                    'nombre' => $this->user->nombre,
                    'apellidos' => $this->user->apellidos,
                    'email' => $this->user->email,
                    'rol' => $this->user->rol
                ];

                $this->response->sendSuccess(200, [
                    "mensaje" => "Inicio de sesión exitoso",
                    "usuario" => $_SESSION['user']
                ]);
            } else {
                $this->response->sendError(401, "Credenciales inválidas");
            }
        } else {
            $this->response->sendError(401, "Credenciales inválidas");
        }
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->nombre) && !empty($data->apellidos) && 
           !empty($data->email) && !empty($data->password)) {
            
            if($this->user->emailExists($data->email)) {
                $this->response->sendError(400, "El correo ya está registrado");
                return;
            }

            $this->user->nombre = $data->nombre;
            $this->user->apellidos = $data->apellidos;
            $this->user->email = $data->email;
            $this->user->password = password_hash($data->password, PASSWORD_DEFAULT);
            $this->user->rol = 'cliente';
            
            if($this->user->create()) {
                $this->response->sendSuccess(201, [
                    "mensaje" => "Usuario registrado exitosamente"
                ]);
            } else {
                $this->response->sendError(500, "Error al crear el usuario");
            }
        } else {
            $this->response->sendError(400, "Datos incompletos");
        }
    }

    public function registerAdmin() {
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->nombre) && !empty($data->apellidos) && 
           !empty($data->email) && !empty($data->password)) {
            
            if($this->user->emailExists($data->email)) {
                $this->response->sendError(400, "El correo ya está registrado");
                return;
            }

            $this->user->nombre = $data->nombre;
            $this->user->apellidos = $data->apellidos;
            $this->user->email = $data->email;
            $this->user->password = password_hash($data->password, PASSWORD_DEFAULT);
            $this->user->rol = 'admin'; // Force role to be admin
            
            if($this->user->create()) {
                $this->response->sendSuccess(201, [
                    "mensaje" => "Administrador registrado exitosamente"
                ]);
            } else {
                $this->response->sendError(500, "Error al crear el administrador");
            }
        } else {
            $this->response->sendError(400, "Datos incompletos");
        }
    }

    public function logout() {
        session_destroy();
        $this->response->sendSuccess(200, [
            "mensaje" => "Sesión cerrada exitosamente"
        ]);
    }

    public function checkSession() {
        if(isset($_SESSION['user'])) {
            $this->response->sendSuccess(200, [
                "autenticado" => true,
                "usuario" => $_SESSION['user']
            ]);
        } else {
            $this->response->sendError(401, "No hay sesión activa");
        }
    }

    // Add these new methods to your AuthController class
    
    public function getAdmins() {
        $admins = $this->user->getAdmins();
        if ($admins) {
            $this->response->sendSuccess(200, $admins);
        } else {
            $this->response->sendError(500, "Error al obtener administradores");
        }
    }
    
    public function deleteAdmin($id) {
        try {
            if (!$id) {
                $this->response->sendError(400, "ID no proporcionado");
                return;
            }
    
            if ($this->user->delete($id)) {
                $this->response->sendSuccess(200, [
                    "mensaje" => "Administrador eliminado exitosamente",
                    "id" => $id
                ]);
            } else {
                $this->response->sendError(500, "Error al eliminar el administrador");
            }
        } catch (Exception $e) {
            $this->response->sendError(500, $e->getMessage());
        }
    }
    
    public function updateAdmin($id) {
        try {
            $data = json_decode(file_get_contents("php://input"));
            
            if(!empty($data->nombre) && !empty($data->apellidos) && !empty($data->email)) {
                $this->user->id_usuario = $id;
                $this->user->nombre = $data->nombre;
                $this->user->apellidos = $data->apellidos;
                $this->user->email = $data->email;
                
                if($this->user->update()) {
                    $this->response->sendSuccess(200, [
                        "mensaje" => "Administrador actualizado exitosamente",
                        "id" => $id
                    ]);
                } else {
                    $this->response->sendError(500, "Error al actualizar administrador");
                }
            } else {
                $this->response->sendError(400, "Datos incompletos");
            }
        } catch (Exception $e) {
            $this->response->sendError(500, $e->getMessage());
        }
    }
}