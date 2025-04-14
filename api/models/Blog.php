<?php
class Blog {
    private $conn;
    private $table_name = "blog";
    
    public $id_blog;
    public $titulo;
    public $slug;
    public $contenido;
    public $excerpt;
    public $author;
    public $category;
    public $read_time;
    public $imagen_portada;
    public $fecha_publicacion;
    public $estado;
    public $is_featured;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    titulo = :titulo,
                    slug = :slug,
                    contenido = :contenido,
                    excerpt = :excerpt,
                    author = :author,
                    category = :category,
                    read_time = :read_time,
                    imagen_portada = :imagen_portada,
                    is_featured = :is_featured";
    
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ":titulo" => $this->titulo,
            ":slug" => $this->slug,
            ":contenido" => $this->contenido,
            ":excerpt" => $this->excerpt,
            ":author" => $this->author,
            ":category" => $this->category,
            ":read_time" => $this->read_time,
            ":imagen_portada" => $this->imagen_portada,
            ":is_featured" => $this->is_featured
        ]);
    }
    
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE estado = 1 ORDER BY fecha_publicacion DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function delete($id) {
        try {
            $query = "DELETE FROM " . $this->table_name . " WHERE id_blog = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
    
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    titulo = :titulo,
                    contenido = :contenido,
                    excerpt = :excerpt,
                    author = :author,
                    category = :category,
                    read_time = :read_time,
                    imagen_portada = :imagen_portada,
                    is_featured = :is_featured
                WHERE id_blog = :id";
    
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ":titulo" => $this->titulo,
            ":contenido" => $this->contenido,
            ":excerpt" => $this->excerpt,
            ":author" => $this->author,
            ":category" => $this->category,
            ":read_time" => $this->read_time,
            ":imagen_portada" => $this->imagen_portada,
            ":is_featured" => $this->is_featured,
            ":id" => $this->id_blog
        ]);
    }
    
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id_blog = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getBySlug($slug) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = :slug AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":slug", $slug);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}