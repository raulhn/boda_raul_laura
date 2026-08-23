create table mesa_retos (
    id_mesa_reto integer primary key auto_increment,
    id_reto integer not null,
    id_mesa integer not null,
    estado varchar(20) not null,
    foreign key (id_reto) references retos(id_reto),
);
