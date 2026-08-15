create table boda.usuario(
 id_usuario integer primary key autoincrement,
 login varchar(50) not null,
 contrasena varchar(255) not null,
 fecha_creacion timestamp default current_timestamp
);
