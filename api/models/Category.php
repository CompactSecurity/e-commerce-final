<?php
class Categoria {
    private $conn;
    private $table_name = "categorias";

    public $id_categoria;
    public $nombre;
    public $slug;
    public $descripcion;
    public $imagen;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create(): bool {
        $query = "INSERT INTO {$this->table_name}
                SET
                    nombre = :nombre,
                    slug = :slug,
                    descripcion = :descripcion,
                    imagen = :imagen,
                    estado = :estado";

        $stmt = $this->conn->prepare($query);

        return $stmt->execute([
            ":nombre" => $this->nombre,
            ":slug" => $this->slug,
            ":descripcion" => $this->descripcion,
            ":imagen" => $this->imagen,
            ":estado" => $this->estado
        ]);
    }

    // Obtener todas las categorías activas
    public function getAll(): array {
        $query = "SELECT * FROM {$this->table_name} WHERE estado = 1 ORDER BY nombre ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener categoría por ID
    public function getById($id): array|false {
        $query = "SELECT * FROM {$this->table_name} WHERE id_categoria = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Obtener categoría por slug
    public function getBySlug($slug): array|false {
        $query = "SELECT * FROM {$this->table_name} WHERE slug = :slug AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":slug", $slug);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Actualizar categoría
    public function update(): bool {
        $query = "UPDATE {$this->table_name}
                SET
                    nombre = :nombre,
                    slug = :slug,
                    descripcion = :descripcion,
                    imagen = :imagen,
                    estado = :estado
                WHERE id_categoria = :id";

        $stmt = $this->conn->prepare($query);

        return $stmt->execute([
            ":nombre" => $this->nombre,
            ":slug" => $this->slug,
            ":descripcion" => $this->descripcion,
            ":imagen" => $this->imagen,
            ":estado" => $this->estado,
            ":id" => $this->id_categoria
        ]);
    }

    // Eliminar categoría
    public function delete($id): bool {
        try {
            $query = "DELETE FROM {$this->table_name} WHERE id_categoria = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Error al eliminar categoría: " . $e->getMessage());
            return false;
        }
    }
}
