<?php
require_once __DIR__ . '/../config/database.php';

class ProductoModel {
    private $conn;
    private $lastError;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {
        try {
            // Generate slug from product name
            $slug = $this->generateSlug($data['nombre']);
            
            $sql = "INSERT INTO productos (
                nombre, descripcion, precio, precio_oferta, stock, 
                id_categoria, id_marca, imagen_principal, 
                cotizable, agregable_carrito, destacado, slug
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute([
                $data['nombre'],
                $data['descripcion'],
                $data['precio'],
                $data['precio_oferta'],
                $data['stock'],
                $data['id_categoria'],
                $data['id_marca'],
                $data['imagen_principal'],
                $data['cotizable'],
                $data['agregable_carrito'],
                $data['destacado'],
                $slug
            ]);
            
            return $result;
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            return false;
        }
    }

    private function generateSlug($text) {
        $text = iconv('UTF-8', 'ASCII//TRANSLIT', $text);
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9-]/', '-', $text);
        $text = preg_replace('/-+/', '-', $text);
        $text = trim($text, '-');
        
        // Ensure uniqueness by adding a timestamp if needed
        $originalSlug = $text;
        $counter = 1;
        while ($this->slugExists($text)) {
            $text = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        return $text;
    }

    private function slugExists($slug) {
        $sql = "SELECT COUNT(*) FROM productos WHERE slug = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$slug]);
        return (int)$stmt->fetchColumn() > 0;
    }

    public function getLastError() {
        return $this->lastError;
    }
    public function update($id, $data) {
        $sql = "UPDATE productos SET 
                nombre = ?, descripcion = ?, precio = ?, precio_oferta = ?, 
                stock = ?, id_categoria = ?, id_marca = ?, cotizable = ?, 
                agregable_carrito = ?, estado = ?, destacado = ?";
        
        if (isset($data['imagen_principal']) && !empty($data['imagen_principal'])) {
            $sql .= ", imagen_principal = ?";
        }
        
        $sql .= " WHERE id_producto = ?";

        try {
            $stmt = $this->conn->prepare($sql);
            $params = [
                $data['nombre'],
                $data['descripcion'],
                $data['precio'],
                $data['precio_oferta'],
                $data['stock'],
                $data['id_categoria'],
                $data['id_marca'],
                $data['cotizable'],
                $data['agregable_carrito'],
                $data['estado']
            ];

            if (isset($data['imagen_principal']) && !empty($data['imagen_principal'])) {
                $params[] = $data['imagen_principal'];
            }
            
            $params[] = $id;
            
            $stmt->execute($params);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function delete($id) {
        try {
            // Soft delete by setting estado = 0
            $sql = "UPDATE productos SET estado = 0 WHERE id_producto = ?";
            $stmt = $this->conn->prepare($sql);
            
            if (!$stmt) {
                $this->lastError = $this->conn->errorInfo()[2];
                error_log("Prepare failed: " . $this->lastError);
                return false;
            }

            $result = $stmt->execute([$id]);
            
            if (!$result) {
                $this->lastError = $stmt->errorInfo()[2];
                error_log("Execute failed: " . $this->lastError);
                return false;
            }

            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Delete error: " . $e->getMessage());
            throw $e;
        }
    }

    public function getAll() {
        $sql = "SELECT * FROM productos WHERE estado = 1 ORDER BY id_producto DESC";
        try {
            $stmt = $this->conn->query($sql);
            $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($productos as &$producto) {
                $producto['precio'] = floatval($producto['precio']);
                $producto['precio_oferta'] = floatval($producto['precio_oferta']);
                $producto['stock'] = intval($producto['stock']);
                $producto['id_categoria'] = intval($producto['id_categoria']);
                $producto['id_marca'] = intval($producto['id_marca']);
            }
            
            return $productos;
        } catch (PDOException $e) {
            error_log("GetAll error: " . $e->getMessage());
            return [];
        }
    }

    public function getById($id) {
        $sql = "SELECT * FROM productos WHERE id_producto = ? AND estado = 1";
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$id]);
            $producto = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($producto) {
                // Cast numerical values
                $producto['precio'] = floatval($producto['precio']);
                $producto['precio_oferta'] = floatval($producto['precio_oferta']);
                $producto['stock'] = intval($producto['stock']);
                $producto['id_categoria'] = intval($producto['id_categoria']);
                $producto['id_marca'] = intval($producto['id_marca']);
            }
            
            return $producto;
        } catch (PDOException $e) {
            return null;
        }
    }

    public function getLastSQLState() {
        if ($this->conn) {
            return $this->conn->errorInfo();
        }
        return null;
    }

    public function getPaginated($offset, $limit) {
        $query = "SELECT * FROM productos WHERE estado = 1 LIMIT :limit OFFSET :offset";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function countAll() {
        $query = "SELECT COUNT(*) as total FROM productos WHERE estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return (int)$result['total'];
    }

    public function getDestacados($limit = 8) {
        try {
            error_log("Executing getDestacados query with limit: $limit");

            $sql = "SELECT p.*, c.nombre as categoria 
                    FROM productos p
                    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
                    WHERE p.estado = 1 AND p.destacado = 1
                    ORDER BY p.id_producto DESC
                    LIMIT $limit";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();

            
            $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert numeric fields to proper types
            foreach ($productos as &$producto) {
                $producto['precio'] = floatval($producto['precio']);
                $producto['precio_oferta'] = floatval($producto['precio_oferta']);
                $producto['stock'] = intval($producto['stock']);
                $producto['id_categoria'] = intval($producto['id_categoria']);
                $producto['id_marca'] = intval($producto['id_marca']);
            }
            
            error_log("SQL Query: $sql");
            error_log("Query Parameters: " . print_r([$limit], true));
            error_log("Number of rows returned: " . count($productos));
            
            return $productos;
        } catch (PDOException $e) {
            error_log("PDO Error in getDestacados: " . $e->getMessage());
            return [];
        }
    }
    public function isConnected() {
        try {
            // Simple query to check connection
            $this->conn->query('SELECT 1');
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}

