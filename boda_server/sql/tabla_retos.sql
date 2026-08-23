create table retos (
    id_reto integer primary key auto_increment,
    nombre_reto varchar(100) not null,
    descripcion varchar(500) not null,
    estado varchar(20) not null,
    icono varchar(100) not null,
);
