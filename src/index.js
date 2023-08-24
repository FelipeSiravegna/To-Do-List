const express = require('express')
const morgan = require('morgan')

const app = express();

//Para ver las peticiones por la consola
app.use(morgan('dev'))

app.listen(3000);
console.log("Server listening on port 3000")