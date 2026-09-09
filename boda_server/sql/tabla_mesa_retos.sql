create table mesa_retos (
    id_mesa_reto integer primary key auto_increment,
    id_reto integer not null,
    id_mesa integer not null,
    estado varchar(20) not null,
    unique key uq_mesa_retos_mesa_reto (id_mesa, id_reto),
    foreign key (id_mesa) references mesa(id_mesa),
    foreign key (id_reto) references retos(id_reto)
);
