const mongoose= require('mongoose');
const usuario = mongoose.model('usuario');

const likesSchema = new mongoose.Schema({
    pensamiento: { 
        type: String, 
        required: [true, 'Debe ingresar un Pensamiento'],
    },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
  
},{ timestamps: true });

const likes= mongoose.model("likes", likesSchema);

module.exports = likes;