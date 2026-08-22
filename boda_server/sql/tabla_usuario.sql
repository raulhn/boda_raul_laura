create table boda.usuario(
 id_usuario integer primary key auto_increment,
 login varchar(50)  not null unique,
 password varchar(255) not null,
 fecha_creacion timestamp default current_timestamp
);
