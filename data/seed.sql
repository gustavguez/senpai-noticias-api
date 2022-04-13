create table noticias(
	id bigserial  not null primary key,
	titulo varchar (255) not null,
	image text
)

insert into noticias(titulo, image) VALUES 
('La 1era guerra nueclear', 'angular.png'),
('La 2era guerra nueclear', '4f0cf8c323ee04886501f83aa4e98aad'),
('La 3era guerra nueclear', '4f0cf8c323ee04886501f83aa4e98aad');