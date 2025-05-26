<?php
require_once __DIR__ . '/../models/PedidoModel.php';
require_once __DIR__ . '/../utils/Response.php';

class PedidoController {
    private $model;
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

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('HTTP/1.1 204 No Content');
            exit();
        }

        $database = new Database();
        $db = $database->getConnection();
        $this->model = new PedidoModel($db);
        $this->response = new Response();
    }

    public function create() {
        try {
            // Verificar si el usuario está autenticado
            if (!isset($_SESSION['user_id'])) {
                $this->response->sendError(401, "Usuario no autenticado");
                return;
            }

            // Obtener datos del pedido
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data || !isset($data['items']) || !isset($data['total']) || !isset($data['direccion_envio']) || !isset($data['metodo_pago'])) {
                $this->response->sendError(400, "Datos incompletos");
                return;
            }
            
            // Asignar el ID del usuario autenticado
            $data['id_usuario'] = $_SESSION['user_id'];
            
            // Crear el pedido
            $id_pedido = $this->model->create($data);
            
            if ($id_pedido) {
                $this->response->sendSuccess(201, [
                    "mensaje" => "Pedido creado exitosamente",
                    "id_pedido" => $id_pedido
                ]);
            } else {
                $error = $this->model->getLastError();
                $this->response->sendError(500, "Error al crear el pedido: " . $error);
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }

    public function getAll() {
        try {
            // Verificar si el usuario es administrador
            if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
                $this->response->sendError(403, "Acceso denegado");
                return;
            }
            
            $pedidos = $this->model->getAll();
            
            if ($pedidos) {
                $this->response->sendSuccess(200, $pedidos);
            } else {
                $this->response->sendSuccess(200, []);
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }

    public function getById($id) {
        try {
            if (!$id) {
                $this->response->sendError(400, "ID no proporcionado");
                return;
            }
            
            $pedido = $this->model->getById($id);
            
            if ($pedido) {
                // Verificar si el usuario es el propietario del pedido o es administrador
                if (isset($_SESSION['user_id']) && 
                    ($_SESSION['user_id'] == $pedido['id_usuario'] || 
                    (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin'))) {
                    $this->response->sendSuccess(200, $pedido);
                } else {
                    $this->response->sendError(403, "Acceso denegado");
                }
            } else {
                $this->response->sendError(404, "Pedido no encontrado");
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }

    public function getByUser() {
        try {
            // Verificar si el usuario está autenticado
            if (!isset($_SESSION['user_id'])) {
                $this->response->sendError(401, "Usuario no autenticado");
                return;
            }
            
            $pedidos = $this->model->getByUserId($_SESSION['user_id']);
            
            if ($pedidos) {
                $this->response->sendSuccess(200, $pedidos);
            } else {
                $this->response->sendSuccess(200, []);
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }

    public function updateStatus($id) {
        try {
            // Verificar si el usuario es administrador
            if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
                $this->response->sendError(403, "Acceso denegado");
                return;
            }
            
            if (!$id) {
                $this->response->sendError(400, "ID no proporcionado");
                return;
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data || !isset($data['estado'])) {
                $this->response->sendError(400, "Estado no proporcionado");
                return;
            }
            
            // Validar que el estado sea válido
            $estados_validos = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];
            if (!in_array($data['estado'], $estados_validos)) {
                $this->response->sendError(400, "Estado no válido");
                return;
            }
            
            if ($this->model->updateStatus($id, $data['estado'])) {
                $this->response->sendSuccess(200, [
                    "mensaje" => "Estado del pedido actualizado exitosamente"
                ]);
            } else {
                $error = $this->model->getLastError();
                $this->response->sendError(500, "Error al actualizar el estado del pedido: " . $error);
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }

    public function updatePaymentInfo($id) {
        try {
            if (!$id) {
                $this->response->sendError(400, "ID no proporcionado");
                return;
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (!$data || !isset($data['payment_id']) || !isset($data['payment_status']) || !isset($data['merchant_order_id'])) {
                $this->response->sendError(400, "Datos de pago incompletos");
                return;
            }
            
            if ($this->model->updatePaymentInfo($id, $data)) {
                $this->response->sendSuccess(200, [
                    "mensaje" => "Información de pago actualizada exitosamente"
                ]);
            } else {
                $error = $this->model->getLastError();
                $this->response->sendError(500, "Error al actualizar la información de pago: " . $error);
            }
        } catch (Exception $e) {
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }
}