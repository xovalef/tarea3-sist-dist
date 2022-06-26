# TAREA 3 Sistemas Distribuidos
## Integrantes:
- Rogrio Alvarez
- Valeria Fuentes

### Como ejecutar:
Para ejecutar este proyecto es necesario instalar [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).
Basta con ejecutar:

```sh

docker-compose up

```

---

### Variables de entorno

En el repositorio existe un archivo `.env` de ejemplo, el cual tiene las configuraciones por default que seran las referencias al cluster de cassandra creado por el `docker-compose`.

---
### Create

Este proyecto levantará una API rest en el puerto `3000` la cual tiene una ruta **`/create`** la que solo responde a request del tipo **POST**. A este endpoint se le debe mandar en el body del request la información del paciente y de la receta correspondiente.

#### **Ejemplo:**

**ruta:**

```
http://localhost:3000/create [POST]
```

**body:**

```json
{
    "nombre": "Melon",
    "apellido": "Musk",
    "rut": "1",
    "email": "Xmelon_muskX@fruitter.com",
    "fecha_nacimiento": "28/06/1971",
    "comentario": "Amigdalitis",
    "farmacos": "Paracetamol",
    "doctor": "El Waton de la Fruta"
}
```

En el caso de ser un nuevo paciente se obtendrá la siguiente respuesta:

```json
{
    "mensaje": "El Paciente y Receta creados"
}
```

---

### Edit

Este proyecto levantará una API rest en el puerto `3000` la cual tiene una ruta **`/edit`** la que solo responde a request del tipo **POST**. A este endpoint se le debe mandar en el body del request la información la receta a editar.

#### **Ejemplo:**

**ruta:**

```
http://localhost:3000/edit [POST]
```

**body:**

```json
{
    "id": 1,
    "comentario": "Amigdalitis aguda",
    "farmacos": "Paracetamol con aguita",
    "doctor": "El Waton de la Fruta"
}
```

En el caso de existir una receta con la id indicada se realizarán los cambios dentro de la tabla y se obtendrá la siguiente respuesta:

```json
{
    "mensaje": "Receta actualizada con exito"
}
```

---
### Delete

Este proyecto levantará una API rest en el puerto `3000` la cual tiene una ruta **`/delete`** la que solo responde a request del tipo **POST**. A este endpoint se le debe mandar en el body del request el id de la receta a eliminar.

#### **Ejemplo:**

**ruta:**

```
http://localhost:3000/delete [POST]
```

**body:**

```json
{
    "id": 1
}
```

En el caso de existir una receta con la id indicada se realizará la eliminacion de la tabla y se mostrará el siguiente mensaje:

```json
{
    "mensaje": "Receta eliminada con exito"
}
```

---

### Preguntas:
#### Pregunta 1:     
- Explique la arquitectura que Cassandra maneja.
> La arquitectura que maneja Cassandra corresponde a una tipo Peer-to-Peer que sigue el protocolo Gossip, el cual se encarga de mantener comunicados a los nodos e informar el estado de los nodos participantes en la red. Para esta arquitectura tambien se considera que todos los nodos tienen el mismo nivel de responsabilidad, es decir, no existe una relación maestro-esclavo.

- Cuando se crea el clúster ¿Cómo los nodos se conectan?
> Los nodos se conectan usando una topología de tipo anillo, donde cada nodo se comunica con los dos nodos adyacentes, estos nodos se organizan de manera alatoria.

- ¿Qué ocurre cuando un cliente realiza una petición a uno de los nodos?
> Cuando un cliente realiza una petición a uno de los nodos, este intentara responder a la consulta realizada buscando información en el mismo nodo o actuando como coordinador redireccionando la petición generada.

- ¿Qué ocurre cuando uno de los nodos se desconecta?
> Gracias a la replicación de cassandra la caída de un nodo no afecta el funcionamiento o respuesta por parte del cluster, ya que provee una estrategia de tolerancia a caídas por parte de un nodo, es decir, en el caso de el sistema implementado en la tarea que consta de 3 nodos y de estos se tiene que si un de ellos se desconecta los otros dos contendrán al menos una réplica de los datos almacenados.

- ¿La red generada entre los nodos siempre es eficiente? 
> No siempre es eficiente. Particularmente desde el punto de vista de las bases de datos de Cassandra se considera que presentan una gran eficiencia y rapidez en cuanto a escribir datos dentro de las tablas, por otra parte, al leer presenta una menor velocidad de respuesta, esto debido a la naturaleza de las redes p2p y la complejidad existente en la busqueda de recursos dentro de la red en los diferentes nodos participantes.


- ¿Existe balanceo de carga?
> Cassandra posee balanceo de carga donde la data es distribuida en los diferentes nodos del cluster usando diferentes estrategias de particionamiento, las cuales son: RandomPartitioner, Murmur3Partitioner y ByteOrderedPartitioner. 

#### Pregunta 2:  
- Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos?
> Cassandra tiene dos estrategias para mantener la redundancia en la réplica de datos, estas corresponden a Simplestrategy y NetworkTopologyStrategy.

- ¿Cuál es la ventaja de uno sobre otro? 
> Por una parte, SimpleStrategy se usa cuando se busca almacenar información dentro de un único datacenter y las réplicas se ubican en los nodos adyacentes siguiendo la orientación de reloj dentro del anillo. Por otra parte, se considera la utilización NetworkTopologyStrategy cuando se busca almacenar dentro de múltiples datacenter, indicando cuantas réplicas existirán en cada uno de los datacenters utilizados y las réplicas buscan ubicarse en distintos datacenters, para evitar problemas de falla de poder, enfriamiento o problemas en la red.

-¿Cuál utilizaría usted en el caso actual y por qué? Justifique apropiadamente su respuesta.
> En el caso actual se utiliza SimpleStrategy ya que se utiliza un único datacenter, en forma de cluster, que contiene a todos los nodos y las réplicas se buscan implementar dentro del mismo datacenter pero en distintos nodos.

#### Pregunta 3: Teniendo en cuenta el contexto del problema 

- ¿Usted cree que la solución propuesta es la correcta? 
> La solución propuesta es correcta ya que logra cumplir con lo solicitado para el sistema implementado, entregando una base de datos escalable y confiable gracias a la técnica de replicación utilizada y la posibilidad de añadir más nodos al cluster.

- ¿Qué ocurre cuando se quiere esclar en la solución?
> Para poder escalar la solución será necesario implementar más nodos, crear nuevos datacenter y con esto modificar la estrategia de replicación a NetworkTopologyStrategy, con esto se logrará tener más puntos de acceso lo que permitirá al sistema recibir y procesar un mayor número de peticiones.

- ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (Replicación/Distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.
> La arquitectura actual se podría mejorar al implementar nuevos datacenters que contengan sus propios nodos y se mantenga una conexión entre clusters, de esta manera se replicará las tablas existentes en cada uno de estos datacenters, de tal manera que se presentará una mayor redundancia y mejor tolerancia a fallos por perdida de datos o conexión con las tablas.
