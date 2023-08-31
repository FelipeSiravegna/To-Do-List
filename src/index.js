const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const taskRoutes = require('./routes/tasks.routes')

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(taskRoutes);

//A esta función son redirigidos todos los errores usando NEXT
app.use((error, req, res, next) => {
    res.json({
        message: error.message
    })
})

app.listen(3000);
console.log("Server listening on port 3000")