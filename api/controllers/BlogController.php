<?php
require_once __DIR__ . '/../models/Blog.php';
require_once __DIR__ . '/../utils/Response.php';

class BlogController {
    private $blog;
    private $response;

    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->blog = new Blog($db);
        $this->response = new Response();
    }

    public function create() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->response->sendError(405, "Método no permitido");
            return;
        }

        if (!isset($_POST['titulo']) || !isset($_POST['contenido'])) {
            $this->response->sendError(400, "Datos incompletos");
            return;
        }

        // Handle image upload
        $imagen_portada = '';
        if (isset($_FILES['imagen_portada'])) {
            $file = $_FILES['imagen_portada'];
            $upload_dir = __DIR__ . '/../uploads/blog/';
            
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            // Sanitize filename and ensure uniqueness
            $filename = uniqid() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "_", $file['name']);
            $target_path = $upload_dir . $filename;

            if (move_uploaded_file($file['tmp_name'], $target_path)) {
                // Store the relative path in the database
                $imagen_portada = '/api/uploads/blog/' . $filename;
            } else {
                $this->response->sendError(500, "Error al subir la imagen");
                return;
            }
        }

        $this->blog->titulo = $_POST['titulo'];
        $this->blog->slug = $this->createSlug($_POST['titulo']);
        $this->blog->contenido = $_POST['contenido'];
        $this->blog->excerpt = $_POST['excerpt'] ?? '';
        $this->blog->author = $_POST['author'] ?? '';
        $this->blog->category = $_POST['category'] ?? '';
        $this->blog->read_time = $_POST['read_time'] ?? '';
        $this->blog->is_featured = isset($_POST['is_featured']) ? $_POST['is_featured'] === 'true' : false;
        $this->blog->imagen_portada = $imagen_portada;

        if ($this->blog->create()) {
            $this->response->sendSuccess(201, ["mensaje" => "Blog creado exitosamente"]);
        } else {
            $this->response->sendError(500, "Error al crear el blog");
        }
    }

    public function getAll() {
        $blogs = $this->blog->getAll();
        if ($blogs) {
            // Add complete URL to image paths
            foreach ($blogs as &$blog) {
                if (!empty($blog['imagen_portada'])) {
                    $blog['imagen_portada'] = 'http://localhost/e-commerce' . $blog['imagen_portada'];
                }
            }
            $this->response->sendSuccess(200, $blogs);
        } else {
            $this->response->sendError(404, "No se encontraron blogs");
        }
    }

    public function getById($id) {
        if (!$id) {
            $this->response->sendError(400, "ID no proporcionado");
            return;
        }

        $blog = $this->blog->getById($id);
        if ($blog) {
            if (!empty($blog['imagen_portada'])) {
                $blog['imagen_portada'] = 'http://localhost/e-commerce' . $blog['imagen_portada'];
            }
            $this->response->sendSuccess(200, $blog);
        } else {
            $this->response->sendError(404, "Blog no encontrado");
        }
    }

    public function delete($id) {
        try {
            if (!$id) {
                $this->response->sendError(400, "ID no proporcionado");
                return;
            }

            // Get the blog image path before deleting
            $blog = $this->blog->getById($id);
            if ($blog && $blog['imagen_portada']) {
                $image_path = __DIR__ . '/..' . parse_url($blog['imagen_portada'], PHP_URL_PATH);
                if (file_exists($image_path)) {
                    unlink($image_path); // Delete the image file
                }
            }

            if ($this->blog->delete($id)) {
                $this->response->sendSuccess(200, [
                    "mensaje" => "Blog eliminado exitosamente",
                    "id" => $id
                ]);
            } else {
                $this->response->sendError(500, "Error al eliminar el blog");
            }
        } catch (Exception $e) {
            $this->response->sendError(500, $e->getMessage());
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->titulo) || !isset($data->contenido)) {
            $this->response->sendError(400, "Datos incompletos");
            return;
        }

        $this->blog->id_blog = $id;
        $this->blog->titulo = $data->titulo;
        $this->blog->contenido = $data->contenido;
        $this->blog->excerpt = $data->excerpt ?? '';
        $this->blog->author = $data->author ?? '';
        $this->blog->category = $data->category ?? '';
        $this->blog->read_time = $data->readTime ?? '';
        $this->blog->is_featured = $data->isFeatured ?? false;
        
        if (isset($data->imagen_portada)) {
            $this->blog->imagen_portada = $data->imagen_portada;
        }

        if ($this->blog->update()) {
            $this->response->sendSuccess(200, ["mensaje" => "Blog actualizado exitosamente"]);
        } else {
            $this->response->sendError(500, "Error al actualizar el blog");
        }
    }

    private function createSlug($string) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string)));
        return $slug;
    }
}