<?php
class Response {
    public function sendSuccess($code, $data) {
        http_response_code($code);
        echo json_encode([
            'status' => 'success',
            'data' => $data
        ]);
        exit();
    }

    public function sendError($code, $message) {
        http_response_code($code);
        echo json_encode([
            'status' => 'error',
            'mensaje' => $message
        ]);
        exit();
    }
}