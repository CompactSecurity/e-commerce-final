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
        // In the create method, modify the image handling part:
        if (isset($_FILES['imagen_principal'])) {
            $file = $_FILES['imagen_principal'];
            $upload_dir = __DIR__ . '/../../public/uploads/productos/'; // Changed path
            
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
        
            $filename = uniqid() . '_' . basename($file['name']);
            $target_path = $upload_dir . $filename;
            
            if (move_uploaded_file($file['tmp_name'], $target_path)) {
                // Store relative path from public folder
                $imagen_principal = '/uploads/productos/' . $filename;
            }
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
            'cotizable' => isset($_POST['cotizable']) && $_POST['cotizable'] === '1' ? 1 : 0,
            'agregable_carrito' => isset($_POST['agregable_carrito']) && $_POST['agregable_carrito'] === '1' ? 1 : 0,
            'destacado' => isset($_POST['destacado']) && $_POST['destacado'] === '1' ? 1 : 0
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
            // Check if request is multipart/form-data
            if (empty($_POST) && !empty($_FILES)) {
                parse_str(file_get_contents("php://input"), $_POST);
            }
    
            // Log the incoming data for debugging
            error_log("Update data received: " . print_r($_POST, true));
    
            // Validate required fields
            $required = ['nombre', 'precio', 'stock', 'id_categoria', 'id_marca'];
            foreach ($required as $field) {
                if (!isset($_POST[$field]) || empty($_POST[$field])) {
                    $this->response->sendError(400, "Campo requerido faltante: $field");
                    return;
                }
            }
    
            // Process checkbox values correctly - use the exact string values from the form
            $cotizable = (isset($_POST['cotizable']) && $_POST['cotizable'] === '1') ? 1 : 0;
            $agregable_carrito = (isset($_POST['agregable_carrito']) && $_POST['agregable_carrito'] === '1') ? 1 : 0;
            
            // Ensure mutual exclusivity
            if ($cotizable === 1) {
                $agregable_carrito = 0;
            }
            
            error_log("Checkbox values after processing - cotizable: $cotizable, agregable_carrito: $agregable_carrito");
    
            $updateData = [
                'nombre' => $_POST['nombre'],
                'descripcion' => $_POST['descripcion'] ?? '',
                'precio' => floatval($_POST['precio']),
                'precio_oferta' => floatval($_POST['precio_oferta'] ?? 0),
                'stock' => intval($_POST['stock']),
                'id_categoria' => intval($_POST['id_categoria']),
                'id_marca' => intval($_POST['id_marca']),
                'cotizable' => $cotizable,
                'agregable_carrito' => $agregable_carrito,
                'estado' => isset($_POST['estado']) && $_POST['estado'] === '1' ? 1 : 0
            ];
    
            // Handle file upload
            if (!empty($_FILES['imagen_principal']['name'])) {
                $upload_dir = __DIR__ . '/../../public/uploads/productos/';
                
                if (!file_exists($upload_dir)) {
                    mkdir($upload_dir, 0777, true);
                }
    
                $filename = uniqid() . '_' . basename($_FILES['imagen_principal']['name']);
                $target_path = $upload_dir . $filename;
                
                if (move_uploaded_file($_FILES['imagen_principal']['tmp_name'], $target_path)) {
                    $updateData['imagen_principal'] = '/uploads/productos/' . $filename;
                }
            }
    
            if ($this->model->update($id, $updateData)) {
                $this->response->sendSuccess(200, [
                    "status" => "success",
                    "mensaje" => "Producto actualizado exitosamente"
                ]);
            } else {
                $error = $this->model->getLastError();
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

    public function getBySlug($slug) {
        // Start output buffering to catch any stray output
        ob_start(); 
    
        // Ensure Content-Type is set early
        header('Content-Type: application/json');
        error_log("getBySlug endpoint hit. Requested slug: " . $slug);
    
        if (!$slug) {
            http_response_code(400);
            error_log("Error in getBySlug: Slug parameter is missing or empty.");
            ob_end_clean(); // Clear buffer before outputting JSON
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Slug no proporcionado'
            ]);
            exit; // Terminate script
        }
        
        try {
            error_log("Calling model->getBySlug for slug: " . $slug);
            $producto = $this->model->getBySlug($slug);
            
            // Log what the model returned
            error_log("Model->getBySlug returned: " . ($producto ? 'Product data found' : 'null/false'));
    
            if ($producto) {
                // Ensure the image path is absolute for the frontend
                if (isset($producto['imagen_principal']) && $producto['imagen_principal'] && !str_starts_with($producto['imagen_principal'], 'http')) {
                    $producto['imagen_principal'] = 'http://localhost/e-commerce' . $producto['imagen_principal'];
                }
                
                error_log("Product found for slug: " . $slug . ". Preparing success response.");
                ob_end_clean(); // Clear buffer before outputting JSON
                echo json_encode([
                    'status' => 'success',
                    'data' => $producto
                ]);
            } else {
                http_response_code(404);
                error_log("Product not found for slug: " . $slug);
                ob_end_clean(); // Clear buffer before outputting JSON
                echo json_encode([
                    'status' => 'error',
                    'mensaje' => 'Producto no encontrado'
                ]);
            }
        } catch (PDOException $pdo_e) { // Catch database errors specifically
            http_response_code(500);
            error_log("PDOException in getBySlug for slug '" . $slug . "': " . $pdo_e->getMessage());
            ob_end_clean(); // Clear buffer before outputting JSON
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Error de base de datos al buscar producto por slug.'
                // Optionally include $pdo_e->getMessage() in development for debugging
            ]);
        } catch (Exception $e) { // Catch any other errors
            http_response_code(500);
            error_log("Exception in getBySlug for slug '" . $slug . "': " . $e->getMessage());
            ob_end_clean(); // Clear buffer before outputting JSON
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Error interno del servidor al buscar producto por slug.'
                // Optionally include $e->getMessage() in development for debugging
            ]);
        }
        exit; // Ensure script terminates after sending response
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

    public function getDestacados() {
        try {
            // Debug: Log the start of the function
            error_log("getDestacados function called");
            
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 8;
            
            // Debug database connection - use a public method instead of direct property access
            error_log("Database connection status: " . 
                ($this->model->isConnected() ? "Connected" : "Not connected"));
                
            $productos = $this->model->getDestacados($limit);
            
            // Debug: Log raw query results
            error_log("Raw productos data: " . print_r($productos, true));
            
            if ($productos) {
                // In getDestacados method, remove the URL prefixing:
                if ($productos) {
                    $this->response->sendSuccess(200, $productos);
                } else {
                    $this->response->sendSuccess(200, []);
                }
            } else {
                error_log("No featured products found in database");
                $this->response->sendSuccess(200, []);
            }
        } catch (Exception $e) {
            // Ensure we're sending JSON even for errors
            if (!headers_sent()) {
                header('Content-Type: application/json');
            }
            $this->response->sendError(500, "Error al obtener productos destacados: " . $e->getMessage());
        }
    }

    public function getRelatedProducts($categoria_id, $producto_id) {
        try {
            if (!$categoria_id || !$producto_id) {
                $this->response->sendError(400, "Categoría ID y Producto ID son requeridos");
                return;
            }
    
            $productos = $this->model->getRelatedProducts($categoria_id, $producto_id);
    
            // Debug: Verificar qué datos llegan
            error_log("Productos relacionados obtenidos: " . print_r($productos, true));
    
            if ($productos) {
                $this->response->sendSuccess(200, $productos);
            } else {
                $this->response->sendSuccess(200, []);
            }
        } catch (Exception $e) {
            error_log("Error en getRelatedProducts: " . $e->getMessage());
            $this->response->sendError(500, "Error al obtener productos relacionados");
        }
    }
    
    public function getRandomOffers() {
        try {
            $productos = $this->model->getRandomOffers();
            
            if ($productos) {
                // Add absolute URLs to images
                foreach ($productos as &$producto) {
                    if ($producto['imagen_principal']) {
                        $producto['imagen_principal'] = 'http://localhost/e-commerce' . $producto['imagen_principal'];
                    }
                }
                $this->response->sendSuccess(200, $productos);
            } else {
                $this->response->sendSuccess(200, []);
            }
        } catch (Exception $e) {
            error_log("Error in getRandomOffers: " . $e->getMessage());
            $this->response->sendError(500, "Error al obtener ofertas: " . $e->getMessage());
        }
    }
    
} // End of class

