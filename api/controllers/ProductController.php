<?php
require_once __DIR__ . '/../models/ProductoModel.php';
require_once __DIR__ . '/../utils/Response.php';

class ProductController {
    private $model;
    private $response;

    public function __construct() {
        header('Content-Type: application/json');
        // Remove duplicate/conflicting headers
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
        header('Access-Control-Allow-Credentials: true');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('HTTP/1.1 204 No Content');
            exit();
        }

        try {
            $database = new Database();
            $db = $database->getConnection();
            $this->model = new ProductoModel($db);
            $this->response = new Response();
        } catch (Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            exit();
        }
    }

    public function delete($id) {
        if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
            error_log("Method not allowed: " . $_SERVER['REQUEST_METHOD']);
            $this->response->sendError(405, "Método no permitido");
            return;
        }

        try {
            error_log("Delete request received for product ID: " . $id);
            error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
            error_log("Request headers: " . print_r(getallheaders(), true));
            
            if (!$id) {
                error_log("Invalid product ID");
                $this->response->sendError(400, "ID de producto inválido");
                return;
            }

            // Verificar si el producto existe antes de intentar eliminarlo
            $product = $this->model->getById($id);
            if (!$product) {
                error_log("Product not found with ID: " . $id);
                $this->response->sendError(404, "Producto no encontrado");
                return;
            }

            if ($this->model->delete($id)) {
                error_log("Product successfully deleted: " . $id);
                $this->response->sendSuccess(200, [
                    "status" => "success",
                    "mensaje" => "Producto eliminado exitosamente",
                    "id" => $id
                ]);
            } else {
                $error = $this->model->getLastError();
                error_log("Database error during deletion: " . $error);
                error_log("SQL State: " . print_r($this->model->getLastSQLState(), true));
                $this->response->sendError(500, "Error al eliminar el producto: " . $error);
            }
        } catch (PDOException $e) {
            error_log("PDO Exception during deletion: " . $e->getMessage());
            error_log("SQL State: " . $e->getCode());
            error_log("Stack trace: " . $e->getTraceAsString());
            $this->response->sendError(500, "Error de base de datos: " . $e->getMessage());
        } catch (Exception $e) {
            error_log("General Exception during deletion: " . $e->getMessage());
            error_log("Stack trace: " . $e->getTraceAsString());
            $this->response->sendError(500, "Error del servidor: " . $e->getMessage());
        }
    }

    public function create() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            error_log("Method not allowed: " . $_SERVER['REQUEST_METHOD']);
            $this->response->sendError(405, "Método no permitido");
            return;
        }

        error_log("POST data: " . print_r($_POST, true));
        error_log("FILES data: " . print_r($_FILES, true));

        if (!isset($_POST['nombre']) || !isset($_POST['precio'])) {
            error_log("Missing required fields");
            $this->response->sendError(400, "Datos incompletos");
            return;
        }

        $imagen_principal = '';
        if (isset($_FILES['imagen_principal'])) {
            $file = $_FILES['imagen_principal'];
            $upload_dir = __DIR__ . '/../uploads/productos/';
            
            error_log("Upload directory: " . $upload_dir);
            
            if (!file_exists($upload_dir)) {
                if (!mkdir($upload_dir, 0777, true)) {
                    error_log("Failed to create upload directory");
                    $this->response->sendError(500, "Error al crear directorio de uploads");
                    return;
                }
            }

            $filename = uniqid() . '_' . basename($file['name']);
            $target_path = $upload_dir . $filename;
            
            error_log("Target path: " . $target_path);

            if (!move_uploaded_file($file['tmp_name'], $target_path)) {
                error_log("Failed to move uploaded file. Upload error: " . $file['error']);
                $this->response->sendError(500, "Error al subir la imagen");
                return;
            }

            $imagen_principal = '/e-commerce/api/uploads/productos/' . $filename;
        }

        $data = [
            'nombre' => $_POST['nombre'],
            'descripcion' => $_POST['descripcion'] ?? '',
            'precio' => floatval($_POST['precio']),
            'precio_oferta' => floatval($_POST['precio_oferta'] ?? 0),
            'stock' => intval($_POST['stock'] ?? 0),
            'id_categoria' => intval($_POST['id_categoria'] ?? 0),
            'id_marca' => intval($_POST['id_marca'] ?? 0),
            'imagen_principal' => $imagen_principal,
            // Modified checkbox handling:
            'cotizable' => isset($_POST['cotizable']) && $_POST['cotizable'] === '1' ? 1 : 0,
            'agregable_carrito' => isset($_POST['agregable_carrito']) && $_POST['agregable_carrito'] === '1' ? 1 : 0,
            'estado' => 1
        ];

        // si es cotizable, deshabilitar agregable_carrito
        if ($data['cotizable'] === 1) {
            $data['agregable_carrito'] = 0;
        }

        error_log("Data to insert: " . print_r($data, true));

        try {
            if ($this->model->create($data)) {
                $this->response->sendSuccess(201, [
                    "mensaje" => "Producto creado exitosamente",
                    "data" => $data
                ]);
            } else {
                $error = $this->model->getLastError();
                error_log("Database error: " . $error);
                $this->response->sendError(500, "Error al crear el producto: " . $error);
            }
        } catch (PDOException $e) {
            error_log("PDO Exception: " . $e->getMessage());
            $this->response->sendError(500, "Error de base de datos: " . $e->getMessage());
        } catch (Exception $e) {
            error_log("General Exception: " . $e->getMessage());
            $this->response->sendError(500, "Error interno del servidor: " . $e->getMessage());
        }
    }

    public function update($id) {
        try {


            error_log("Update request received for product ID: " . $id);
            error_log("POST data: " . print_r($_POST, true));
            error_log("FILES data: " . print_r($_FILES, true));
            error_log("Session data: " . print_r($_SESSION, true));

            // Obtener datos de entrada
            $input = file_get_contents("php://input");
            error_log("Raw input: " . $input);

            if (empty($_POST['nombre']) || !isset($_POST['precio'])) {
                $this->response->sendError(400, "Datos incompletos");
                return;
            }

            $updateData = [
                'nombre' => $_POST['nombre'],
                'descripcion' => $_POST['descripcion'] ?? '',
                'precio' => floatval($_POST['precio']),
                'precio_oferta' => floatval($_POST['precio_oferta'] ?? 0),
                'stock' => intval($_POST['stock'] ?? 0),
                'id_categoria' => intval($_POST['id_categoria'] ?? 0),
                'id_marca' => intval($_POST['id_marca'] ?? 0),
                'cotizable' => isset($_POST['cotizable']) ? 1 : 0,
                'agregable_carrito' => isset($_POST['cotizable']) ? 0 : (isset($_POST['agregable_carrito']) ? 1 : 0),
                'estado' => isset($_POST['estado']) ? 1 : 0
            ];

            if (isset($_FILES['imagen_principal']) && $_FILES['imagen_principal']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['imagen_principal'];
                $upload_dir = __DIR__ . '/../uploads/productos/';
                
                if (!file_exists($upload_dir)) {
                    mkdir($upload_dir, 0777, true);
                }

                $filename = uniqid() . '_' . basename($file['name']);
                $target_path = $upload_dir . $filename;
                
                if (move_uploaded_file($file['tmp_name'], $target_path)) {
                    $updateData['imagen_principal'] = '/e-commerce/api/uploads/productos/' . $filename;
                }
            }

            if ($this->model->update($id, $updateData)) {
                $this->response->sendSuccess(200, [
                    "status" => "success",
                    "mensaje" => "Producto actualizado exitosamente"
                ]);
            } else {
                $error = $this->model->getLastError();
                error_log("Update error: " . $error);
                $this->response->sendError(500, "Error al actualizar el producto: " . $error);
            }
        } catch (Exception $e) {
            error_log("Exception in update: " . $e->getMessage());
            $this->response->sendError(500, "Error del servidor: " . $e->getMessage());
        }
    }

    public function getAll() {
        $productos = $this->model->getAll();
        if ($productos) {
            foreach ($productos as &$producto) {
                if ($producto['imagen_principal']) {
                    $producto['imagen_principal'] = 'http://localhost/e-commerce' . $producto['imagen_principal'];
                }
            }
            $this->response->sendSuccess(200, $productos);
        } else {
            $this->response->sendError(404, "No se encontraron productos");
        }
    }

    public function getById($id) {
        if (!$id) {
            $this->response->sendError(400, "ID no proporcionado");
            return;
        }

        $producto = $this->model->getById($id);
        if ($producto) {
            if ($producto['imagen_principal']) {
                $producto['imagen_principal'] = 'http://localhost/e-commerce' . $producto['imagen_principal'];
            }
            $this->response->sendSuccess(200, $producto);
        } else {
            $this->response->sendError(404, "Producto no Encontrado");
        }
    }

    public function getPaginated() {
        try {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 9;
            
            $offset = ($page - 1) * $limit;
            
            $totalProducts = $this->model->countAll();
            $totalPages = ceil($totalProducts / $limit);
            
            $products = $this->model->getPaginated($offset, $limit);
            
            $this->response->sendSuccess(200, [
                'data' => $products,
                'currentPage' => $page,
                'totalPages' => $totalPages,
                'totalProducts' => $totalProducts
            ]);
        } catch (Exception $e) {
            $this->response->sendError(500, "Error al obtener productos: " . $e->getMessage());
        }
    }
}