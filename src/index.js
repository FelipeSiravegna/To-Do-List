const express = require('express')
const morgan = require('morgan')

const taskRoutes = require('./routes/tasks.routes')

const app = express();

//Para ver las peticiones por la consola
app.use(morgan('dev'))
//Ahora express entiende los datos que se envíen junto a una petición POST
app.use(express.json())

app.use(taskRoutes);

app.listen(3000);
console.log("Server listening on port 3000")