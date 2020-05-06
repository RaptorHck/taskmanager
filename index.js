const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');



//Crear servidor
const app = express();

//Conectar a la base de datos
connectDB();

//Habilitar cors
app.use(cors());

//Habilidatr express.json

app.use(express.json({ extened: true}));


//Importar Routes
app.use('/api/users',       require('./routes/users'));
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/projects',    require('./routes/projects'));
app.use('/api/tasks',       require('./routes/tasks'));


//Puesrto de la app
const port = process.env.port || 4000;

//Definir la pagina principal
/*
app.get('', (req, res) => {
    res.send('Its works');
});
*/

//Iniciar la app 
app.listen(port, '0.0.0.0', () => {
    console.log(`A Serv is running, listen in port ${PORT}`);
});


