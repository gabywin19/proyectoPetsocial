const express= require("express");
const app= express();
const port=7070;
require('./Server/Config/mongoose.config');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config()
console.log(process.env.SECRET_KEY)
const cors = require('cors')
const path = require('path')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, 'server/uploads')))

const routes = require('./Server/Routes/usuario.routes');
 require('./Server/Routes/publicaciones.routes')(app)
 require('./Server/Routes/comentarios.routes')(app)
 
routes(app);

app.listen(port, ()=>console.log('Server ON'));