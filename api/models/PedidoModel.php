<?php
require_once __DIR__ . '/../config/database.php';

class PedidoModel {
    private $conn;
    private $table_name = "pedidos";
    private $items_table = "pedido_items";
    private $lastError;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getLastError() {
        return $this->lastError;
    }

    public function create($data) {
        try {
            $this->conn->beginTransaction();

            // Insertar el pedido principal
            $query = "INSERT INTO " . $this->table_name . " 
                    (id_usuario, total, direccion_envio, metodo_pago, preference_id) 
                    VALUES (?, ?, ?, ?, ?)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                $data['id_usuario'],
                $data['total'],
                $data['direccion_envio'],
                $data['metodo_pago'],
                $data['preference_id'] ?? null
            ]);
            
            $id_pedido = $this->conn->lastInsertId();
            
            // Insertar los items del pedido
            foreach ($data['items'] as $item) {
                $query = "INSERT INTO " . $this->items_table . " 
                        (id_pedido, id_producto, cantidad, precio_unitario) 
                        VALUES (?, ?, ?, ?)";
                
                $stmt = $this->conn->prepare($query);
                $stmt->execute([
                    $id_pedido,
                    $item['id_producto'],
                    $item['cantidad'],
                    $item['precio_unitario']
                ]);
                
                // Actualizar stock del producto
                $this->updateProductStock($item['id_producto'], $item['cantidad']);
            }
            
            $this->conn->commit();
            return $id_pedido;
        } catch (PDOException $e) {
            $this->conn->rollBack();
            $this->lastError = $e->getMessage();
            error_log("Error creating order: " . $e->getMessage());
            return false;
        }
    }

    private function updateProductStock($id_producto, $cantidad) {
        $query = "UPDATE productos SET stock = stock - ? WHERE id_producto = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$cantidad, $id_producto]);
    }

    public function getAll() {
        try {
            $query = "SELECT p.*, u.nombre, u.apellidos, u.email 
                      FROM " . $this->table_name . " p
                      LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
                      ORDER BY p.fecha_pedido DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Error getting all orders: " . $e->getMessage());
            return false;
        }
    }

    public function getById($id) {
        try {
            // Obtener datos del pedido
            $query = "SELECT p.*, u.nombre, u.apellidos, u.email 
                      FROM " . $this->table_name . " p
                      LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
                      WHERE p.id_pedido = ?";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$id]);
            
            $pedido = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$pedido) {
                return false;
            }
            
            // Obtener items del pedido
            $query = "SELECT pi.*, pr.nombre as producto_nombre, pr.imagen_principal 
                      FROM " . $this->items_table . " pi
                      LEFT JOIN productos pr ON pi.id_producto = pr.id_producto
                      WHERE pi.id_pedido = ?";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$id]);
            
            $pedido['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Formatear las URLs de las imágenes
            foreach ($pedido['items'] as &$item) {
                if (!empty($item['imagen_principal'])) {
                    $item['imagen_principal'] = 'http://localhost/e-commerce' . $item['imagen_principal'];
                }
            }
            
            return $pedido;
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Error getting order by ID: " . $e->getMessage());
            return false;
        }
    }

    public function getByUserId($id_usuario) {
        try {
            $query = "SELECT * FROM " . $this->table_name . " 
                      WHERE id_usuario = ?
                      ORDER BY fecha_pedido DESC";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$id_usuario]);
            
            $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Obtener items para cada pedido
            foreach ($pedidos as &$pedido) {
                $query = "SELECT pi.*, pr.nombre as producto_nombre, pr.imagen_principal 
                          FROM " . $this->items_table . " pi
                          LEFT JOIN productos pr ON pi.id_producto = pr.id_producto
                          WHERE pi.id_pedido = ?";
                
                $stmt = $this->conn->prepare($query);
                $stmt->execute([$pedido['id_pedido']]);
                
                $pedido['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Formatear las URLs de las imágenes
                foreach ($pedido['items'] as &$item) {
                    if (!empty($item['imagen_principal'])) {
                        $item['imagen_principal'] = 'http://localhost/e-commerce' . $item['imagen_principal'];
                    }
                }
            }
            
            return $pedidos;
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Error getting orders by user ID: " . $e->getMessage());
            return false;
        }
    }

    public function updateStatus($id, $status) {
        try {
            $query = "UPDATE " . $this->table_name . " 
                      SET estado = ? 
                      WHERE id_pedido = ?";
            
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([$status, $id]);
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Error updating order status: " . $e->getMessage());
            return false;
        }
    }

    public function updatePaymentInfo($id, $data) {
        try {
            $query = "UPDATE " . $this->table_name . " 
                      SET payment_id = ?, payment_status = ?, merchant_order_id = ? 
                      WHERE id_pedido = ?";
            
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([
                $data['payment_id'],
                $data['payment_status'],
                $data['merchant_order_id'],
                $id
            ]);
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Error updating payment info: " . $e->getMessage());
            return false;
        }
    }
}