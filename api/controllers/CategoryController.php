<?php
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../utils/Response.php';

class CategoryController {
    private $categoria;
    private $response;

    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->categoria = new Categoria($db);
        $this->response = new Response();
    }

    // Crear nueva categoría
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->response->sendError(405, "Método no permitido");
            return;
        }

        if (!isset($_POST['nombre']) || !isset($_POST['slug'])) {
            $this->response->sendError(400, "Datos incompletos");
            return;
        }

        // Handle image upload (si es necesario)
        $imagen = '';
        if (isset($_FILES['imagen'])) {
            $file = $_FILES['imagen'];
            $upload_dir = __DIR__ . '/../uploads/categorias/';
            
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            $filename = uniqid() . '_' . basename($file['name']);
            $target_path = $upload_dir . $filename;

            if (move_uploaded_file($file['tmp_name'], $target_path)) {
                $imagen = '/e-commerce/api/uploads/categorias/' . $filename;
            }
        }

        // Set category data
        $this->categoria->nombre = $_POST['nombre'];
        $this->categoria->slug = $_POST['slug'];
        $this->categoria->descripcion = $_POST['descripcion'] ?? '';
        $this->categoria->imagen = $imagen;
        $this->categoria->estado = isset($_POST['estado']) ? $_POST['estado'] : 1;

        if ($this->categoria->create()) {
            $this->response->sendSuccess(201, ["mensaje" => "Categoría creada exitosamente"]);
        } else {
            $this->response->sendError(500, "Error al crear la categoría");
        }
    }

    // Obtener todas las categorías
    public function getAll() {
        $categorias = $this->categoria->getAll();
        if ($categorias) {
            $this->response->sendSuccess(200, $categorias);
        } else {
            $this->response->sendError(404, "No se encontraron categorías");
        }
    }

    // Obtener categoría por ID
    public function getById($id) {
        if (!$id) {
            $this->response->sendError(400, "ID no proporcionado");
            return;
        }

        $categoria = $this->categoria->getById($id);
        if ($categoria) {
            // Asegurar que la ruta de la imagen sea completa
            if ($categoria['imagen']) {
                $categoria['imagen'] = 'http://localhost/e-commerce' . $categoria['imagen'];
            }
            $this->response->sendSuccess(200, $categoria);
        } else {
            $this->response->sendError(404, "Categoría no encontrada");
        }
    }

    // Actualizar categoría
    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->nombre) || !isset($data->slug)) {
            $this->response->sendError(400, "Datos incompletos");
            return;
        }

        $this->categoria->id_categoria = $id;
        $this->categoria->nombre = $data->nombre;
        $this->categoria->slug = $data->slug;
        $this->categoria->descripcion = $data->descripcion ?? '';
        $this->categoria->estado = isset($data->estado) ? $data->estado : 1;
        
        if (isset($data->imagen)) {
            $this->categoria->imagen = $data->imagen;
        }

        if ($this->categoria->update()) {
            $this->response->sendSuccess(200, ["mensaje" => "Categoría actualizada exitosamente"]);
        } else {
            $this->response->sendError(500, "Error al actualizar la categoría");
        }
    }

    // Eliminar categoría
    public function delete($id) {
        try {
            if (!$id) {
                $this->response->sendError(400, "ID no proporcionado");
                return;
            }

            // Eliminar imagen antes de eliminar la categoría (si existe)
            $categoria = $this->categoria->getById($id);
            if ($categoria && $categoria['imagen']) {
                $image_path = __DIR__ . '/..' . parse_url($categoria['imagen'], PHP_URL_PATH);
                if (file_exists($image_path)) {
                    unlink($image_path); // Eliminar archivo de imagen
                }
            }

            if ($this->categoria->delete($id)) {
                $this->response->sendSuccess(200, [
                    "mensaje" => "Categoría eliminada exitosamente",
                    "id" => $id
                ]);
            } else {
                $this->response->sendError(500, "Error al eliminar la categoría");
            }
        } catch (Exception $e) {
            $this->response->sendError(500, $e->getMessage());
        }
    }
}
