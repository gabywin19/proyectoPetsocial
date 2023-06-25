const mongoose = require("mongoose");

const publicacionesSchema = new mongoose.Schema(
  {
    pensamiento: {
      type: String,
      required: [true, "Debe ingresar un Pensamiento"],
    },
    imagen: {
      type: {},
      // required: [true, 'Imagen de producto es requerido'],
    },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "comentarios" }],
  },
  { timestamps: true }
);

const publicaciones = mongoose.model("publicaciones", publicacionesSchema);

module.exports = publicaciones;
