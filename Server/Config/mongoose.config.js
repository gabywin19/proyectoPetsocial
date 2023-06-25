const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/petSocial_db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('Conectado!!'))
.catch(err => console.log('No se puede conectar a la base de datos', err))