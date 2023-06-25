const mongoose= require('mongoose');

const comentariosSchema = new mongoose.Schema({
    comentario: {
        required: [true, 'Necesita un comentario'],
        type: String, 
        minlength: [3, 'El Comentario debe tener minimo 3 Caracteres']
    },
    publicaciones: { type: mongoose.Schema.Types.ObjectId, ref: "publicaciones" },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
},{ timestamps: true });

const comentarios= mongoose.model("comentarios", comentariosSchema);

module.exports = comentarios;