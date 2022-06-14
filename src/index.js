const cassandra = require("cassandra-driver");
const fastify = require("fastify")({
  logger: true,
});

client = new cassandra.Client({
  contactPoints: ["cassandra-node1"],
  localDataCenter: "datacenter1",
  credentials: { username: "cassandra", password: "password123" },
});
// FUNCIONES

async function insertPaciente(nombre, apellido, rut, email, fecha_nacimiento){
  const query2 = `SELECT COUNT(*) FROM ks1.paciente;`;
  const totalPacientes = await client.execute(query2);
  const idNewPaciente = totalPacientes.rows[0].count.low + 1;
  const insertQueryPaciente = `INSERT INTO ks1.paciente(id,nombre, apellido, rut, email, fecha_nacimiento)
                        VALUES (${idNewPaciente},'${nombre}','${apellido}','${rut}','${email}','${fecha_nacimiento}');`;
  await client.execute(insertQueryPaciente);

  return (idNewPaciente);
}

async function insertReceta(idNewPaciente,comentario,farmacos,doctor){
  const query3 = `SELECT COUNT(*) FROM ks2.recetas;`;
  const totalRecetas = await client.execute(query3);
  const idNewReceta = totalRecetas.rows[0].count.low + 1;
  const insertQueryReceta = `INSERT INTO ks2.recetas(id, id_paciente, comentario, farmacos, doctor)
                            VALUES (${idNewReceta}, ${idNewPaciente}, '${comentario}','${farmacos}','${doctor}');`;
  await client.execute(insertQueryReceta);
}
//


fastify.get("/", async (request, reply) => {
  reply.type("application/json").code(200);
  const query = "SELECT * FROM ks2.recetas;";
  const data = await client.execute(query);
  return {  data: data.rows };
});

fastify.post("/create", async (request, reply) => {
  const {nombre, apellido, rut, email, fecha_nacimiento, comentario, farmacos, doctor} = request.body;
  const query = `SELECT id FROM ks1.paciente WHERE rut = '${rut}' ALLOW FILTERING; `;
  const data = await client.execute(query);
  // Si el cliente no existe se crea
  if( data.rowLength==0){
    const idNewPaciente = await insertPaciente(nombre, apellido, rut, email, fecha_nacimiento);
    await insertReceta(idNewPaciente,comentario,farmacos,doctor);
    return {mensaje: "Paciente y Receta creados"};
  }

  // Si el cliente existe solo se crea la receta
  else{
    const idPaciente = data.rows[0].id;
    await insertReceta(idPaciente, comentario, farmacos, doctor);
    return {mensaje: "Paciente existe y Receta creada"};
  }
});

fastify.post("/edit", async (request, reply) => {
  const {id, comentario, farmacos, doctor} = request.body;
  const query = `SELECT id FROM ks2.recetas WHERE id = ${id};`;
  const data = await client.execute(query);
  if(data.rowLength==0){
    reply.code(404);
    return {mensaje: "No existe receta con la id indicada"};
  }
  else{
    const query2= `UPDATE ks2.recetas SET 
                  comentario = '${comentario}',
                  farmacos = '${farmacos}',
                  doctor = '${doctor}'
                  WHERE id = ${id};`;
    await client.execute(query2);
    return {mensaje:"Receta actualizada con exito"};
  }
});

fastify.post("/delete", async (request, reply) => {
  const {id} = request.body;
  const query = `SELECT id FROM ks2.recetas WHERE id= ${id};`;
  const data = await client.execute(query);
  if(data.rowLength==0){
    reply.code(404);
    return {mensaje: "No existe receta con la id indicada"};
  }
  else{
    const query2 = `DELETE FROM ks2.recetas WHERE id = ${id}`;
    await client.execute(query2);
    return {mensaje:"Receta eliminada con exito"};
  }
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
