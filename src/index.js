const cassandra = require("cassandra-driver");
const fastify = require("fastify")({
  logger: true,
});

client = new cassandra.Client({
  contactPoints: ["cassandra-node1"],
  localDataCenter: "datacenter1",
  credentials: { username: "cassandra", password: "password123" },
});

fastify.get("/", async (request, reply) => {
  reply.type("application/json").code(200);
  const query = "SELECT * FROM ks2.recetas;";
  const data = await client.execute(query);
  return { hello: "world", data: data.rows };
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
