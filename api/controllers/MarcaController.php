<?php
require_once __DIR__ . '/../models/Marca.php';

class MarcaController {
    private $marca;
    private $uploadDir;

    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->marca = new Marca($db);
        $this->uploadDir = __DIR__ . '/../../public/uploads/marcas/';
        
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0777, true);
        }
    }

    public function create() {
        header('Content-Type: application/json');
        
        try {
            if (!isset($_POST['nombre'])) {
                throw new Exception('El nombre es requerido');
            }

            $logo = ''; // Changed from imagen_logo to logo
            if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['logo'];
                $filename = uniqid() . '_' . basename($file['name']);
                $target_path = $this->uploadDir . $filename;

                if (move_uploaded_file($file['tmp_name'], $target_path)) {
                    $logo = '/uploads/marcas/' . $filename;
                } else {
                    throw new Exception('Error al subir el logo');
                }
            }

            $this->marca->nombre = $_POST['nombre'];
            $this->marca->descripcion = $_POST['descripcion'] ?? '';
            $this->marca->logo = $logo; // Changed from imagen_logo to logo

            if ($this->marca->create()) {
                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Marca creada exitosamente'
                ]);
            } else {
                throw new Exception('Error al crear la marca');
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'mensaje' => $e->getMessage()
            ]);
        }
    }

    public function getAll() {
        header('Content-Type: application/json');
        try {
            $marcas = $this->marca->getAll();
            echo json_encode([
                'status' => 'success',
                'data' => $marcas
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'mensaje' => $e->getMessage()
            ]);
        }
    }

    public function delete($id) {
        header('Content-Type: application/json');
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            http_response_code(405);
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Método no permitido'
            ]);
            return;
        }
        try {
            if (!$id) {
                throw new Exception('ID no proporcionado');
            }

            // Get marca info to delete the logo file
            $marca = $this->marca->getById($id);
            if ($marca && $marca['logo']) {
                $logo_path = __DIR__ . '/../../public' . $marca['logo'];
                if (file_exists($logo_path)) {
                    unlink($logo_path);
                }
            }

            if ($this->marca->delete($id)) {
                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Marca eliminada exitosamente'
                ]);
            } else{
                throw new Exception('Error al eliminar la marca');
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'mensaje' => $e->getMessage()
            ]);
        }
    }

    public function update($id) {
        header('Content-Type: application/json');
        try {
            // Parse JSON body if Content-Type is application/json
            $input = [];
            if (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
                $raw = file_get_contents('php://input');
                $input = json_decode($raw, true);
            } else {
                $input = $_POST;
            }

            if (!isset($input['nombre'])) {
                throw new Exception('El nombre es requerido');
            }

            $marca = $this->marca->getById($id);
            if (!$marca) {
                throw new Exception('Marca no encontrada');
            }

            // If updating logo via URL (from JSON), just use the provided value
            $logo = isset($input['logo']) ? $input['logo'] : $marca['logo'];

            $this->marca->id = $id;
            $this->marca->nombre = $input['nombre'];
            $this->marca->slug = isset($input['slug']) ? $input['slug'] : $marca['slug'];
            $this->marca->descripcion = isset($input['descripcion']) ? $input['descripcion'] : '';
            $this->marca->logo = $logo;
            $this->marca->estado = isset($input['estado']) ? $input['estado'] : $marca['estado'];

            if ($this->marca->update()) {
                echo json_encode([
                    'status' => 'success',
                    'mensaje' => 'Marca actualizada exitosamente'
                ]);
            } else {
                throw new Exception('Error al actualizar la marca');
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'mensaje' => $e->getMessage()
            ]);
        }
    }

    public function getById($id) {
        header('Content-Type: application/json');
        try {
            $marca = $this->marca->getById($id);
            if ($marca) {
                echo json_encode([
                    'status' => 'success',
                    'data' => $marca
                ]);
            } else {
                throw new Exception('Marca no encontrada');
            }
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'mensaje' => $e->getMessage()
            ]);
        }
    }
}