<?php
class User {
    private $conn;
    private $table_name = "usuarios";
    
    public $id_usuario;
    public $nombre;
    public $apellidos;
    public $email;
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
                    password = :password,
                    rol = :rol";
    
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute([
            ":nombre" => $this->nombre,
            ":apellidos" => $this->apellidos,
            ":email" => $this->email,
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
}