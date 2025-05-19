<?php
class User {
    private $conn;
    private $table_name = "usuarios";
    
    public $id_usuario;
    public $nombre;
    public $apellidos;
    public $email;
    public $telefono;
    public $password;
    public $rol;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    nombre = :nombre,
                    apellidos = :apellidos,
                    email = :email,
                    telefono = :telefono,
                    password = :password,
                    rol = :rol";
    
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ":nombre" => $this->nombre,
            ":apellidos" => $this->apellidos,
            ":email" => $this->email,
            ":telefono" => $this->telefono,
            ":password" => $this->password,
            ":rol" => $this->rol
        ]);
    }
    
    public function checkLogin() {
        $query = "SELECT id_usuario, nombre, apellidos, email, password, rol 
                 FROM " . $this->table_name . "
                 WHERE email = :email";
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute([":email" => $this->email]);
        
        if($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $this->id_usuario = $row['id_usuario'];
            $this->nombre = $row['nombre'];
            $this->apellidos = $row['apellidos'];
            $this->password = $row['password'];
            $this->rol = $row['rol'];
            return true;
        }
        return false;
    }
    
    public function emailExists($email) {
        $query = "SELECT id_usuario FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([":email" => $email]);
        return $stmt->rowCount() > 0;
    }
    
    // Add these methods to your User class
    
    public function getAdmins() {
        $query = "SELECT id_usuario, nombre, apellidos, email FROM " . $this->table_name . " WHERE rol = 'admin'";
        $stmt = $this->conn->prepare($query);
        
        if($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return false;
    }
    
    public function delete($id) {
        try {
            $query = "DELETE FROM " . $this->table_name . " WHERE id_usuario = :id";
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
                SET nombre = :nombre,
                    apellidos = :apellidos,
                    email = :email
                WHERE id_usuario = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id", $this->id_usuario);
        
        return $stmt->execute();
    }
    
    public function getProfileData($userId) {
        try {
            $query = "SELECT id_usuario, nombre, apellidos, email, telefono, 
                             rol, fecha_registro 
                      FROM " . $this->table_name . " 
                      WHERE id_usuario = ? AND estado = 1";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$userId]);
            
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getProfileData: " . $e->getMessage());
            return false;
        }
    }
    
    public function getOrders($userId) {
        try {
            $query = "SELECT p.id_pedido, p.fecha_pedido, p.total, p.estado_pedido 
                      FROM pedidos p 
                      WHERE p.id_usuario = ? 
                      ORDER BY p.fecha_pedido DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$userId]);
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getOrders: " . $e->getMessage());
            return [];
        }
    }
    
    public function getAddresses($userId) {
        try {
            $query = "SELECT id_direccion, direccion, referencia, principal 
                      FROM direcciones 
                      WHERE id_usuario = ?";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$userId]);
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error in getAddresses: " . $e->getMessage());
            return [];
        }
    }
    
    public function updateProfile($userId, $data) {
        try {
            $query = "UPDATE usuarios SET 
                     nombre = :nombre,
                     apellidos = :apellidos,
                     email = :email,
                     telefono = :telefono
                     WHERE id_usuario = :id";
            
            $stmt = $this->conn->prepare($query);
            
            return $stmt->execute([
                ':nombre' => $data['nombre'],
                ':apellidos' => $data['apellidos'],
                ':email' => $data['email'],
                ':telefono' => $data['telefono'],
                ':id' => $userId
            ]);
        } catch (PDOException $e) {
            error_log("Error in updateProfile: " . $e->getMessage());
            return false;
        }
    }
}