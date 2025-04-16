<?php
class Marca {
    private $conn;
    private $table_name = "marcas";
    
    public $id;
    public $nombre;
    public $slug;
    public $descripcion;
    public $logo;
    public $estado;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Crear una nueva marca
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    nombre = :nombre,
                    slug = :slug,
                    descripcion = :descripcion,
                    logo = :logo,
                    estado = :estado";
    
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ":nombre" => $this->nombre,
            ":slug" => $this->slug,
            ":descripcion" => $this->descripcion,
            ":logo" => $this->logo,
            ":estado" => $this->estado ?? 1
        ]);
    }
    
    // Obtener todas las marcas activas
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE estado = 1 ORDER BY nombre ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    // Eliminar una marca
    public function delete($id) {
        try {
            $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
    
    // Actualizar los datos de una marca
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    nombre = :nombre,
                    slug = :slug,
                    descripcion = :descripcion,
                    logo = :logo,
                    estado = :estado
                WHERE id = :id";
    
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ":nombre" => $this->nombre,
            ":slug" => $this->slug,
            ":descripcion" => $this->descripcion,
            ":logo" => $this->logo,
            ":estado" => $this->estado ?? 1,
            ":id" => $this->id
        ]);
    }
    
    // Obtener una marca por su ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    // Obtener una marca por su Slug
    public function getBySlug($slug) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = :slug AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":slug", $slug);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
