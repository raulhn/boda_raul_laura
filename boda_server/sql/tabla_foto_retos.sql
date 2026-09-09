CREATE TABLE foto_retos (
    id_foto_reto INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_mesa INTEGER NOT NULL,
    id_reto INTEGER NOT NULL,
    ruta_foto VARCHAR(255) NOT NULL,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_foto_retos_mesa_reto (id_mesa, id_reto),
    FOREIGN KEY (id_mesa) REFERENCES mesa(id_mesa),
    FOREIGN KEY (id_reto) REFERENCES retos(id_reto)
);
