CREATE TABLE tabla_tokens_mesa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(64) NOT NULL UNIQUE,
    id_mesa INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    UNIQUE KEY uq_tabla_tokens_mesa_id_mesa (id_mesa),
    FOREIGN KEY (id_mesa) REFERENCES boda.mesa(id_mesa)
);