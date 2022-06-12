const cassandra=require('cassandra-driver')
client=new cassandra.Client({
    contactPoints:["cassandra-node1"],
    localDataCenter:'cassandra-cluster',
    credentials:{username:'cassandra',
    password:'password123'
}})
//client.execute("select uuid() from system.local").then(console.log)
//client.execute("select uuid() from system.local").then(data=>x=data)
//x.rows[0]['system.uuid()'].toString()

const fastify = require('fastify')({
    logger:true
})

fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200)
    const query = "SELECT * FROM ks2.recetas;"
    const data = await client.execute(query)
    return { hello: 'world', data}
})
  
fastify.listen({ port: 3000, host:'0.0.0.0' }, (err, address) => {
    if (err) throw err
        console.log(`Server is now listening on ${address}`)
})