CREATE KEYSPACE ks1 WITH replication = {'class': 'SimpleStrategy','replication_factor' : 2};
CREATE KEYSPACE ks2 WITH replication = {'class': 'SimpleStrategy','replication_factor' : 3};
CREATE TABLE ks1.paciente (id int, nombre, text, appelido text, rut text, email text, fecha_nacimiento text, PRIMARY KEY(id));
CREATE TABLE ks2.recetas (id int, id_paciente int, comentario text, farmacos text, doctor text, PRIMARY KEY(id));

