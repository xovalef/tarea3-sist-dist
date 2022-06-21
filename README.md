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
#### 1.- Explique la arquitectura que Cassandra maneja. Cuando se crea el clúster ¿Cómo los nodos se conectan? ¿Qué ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta? ¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?

- 

#### 2.- Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted en el caso actual y por qué? Justifique apropiadamente su respuesta.

#### 4.- Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre cuando se quiere esclar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (Replicación/Distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.

