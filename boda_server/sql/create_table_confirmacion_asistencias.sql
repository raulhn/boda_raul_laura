create table boda.confirmacion_asistencia
(
    id_confirmacion_asistencia integer primary key,
    nombre_completo varchar(100) not null,
    correo_electronico varchar(100),
    telefono varchar(20),
    asistencia varchar(1) not null default 'S',
    mensaje varchar(500) null,
    num_asistentes integer,
    restricciones_alimentarias varchar(500) null,
    fecha_confirmacion timestamp not null default current_timestamp
);
