const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  imagen: {
    type: {},
    // required: [true, 'Imagen de producto es requerido'],
  },
  
  email: {
      type: String,
      required: [true, 'Debe ingresar un Email'],
      unique: true
    },

    password: {
      type: String,
      required: [true, 'Se requiere Contraseña'],
      minlength: [8, 'La contraseña debe tener minimo 8 Caracteres']
    },
  
  petName: {
    type: String,
    min: [3, 'El Nombre de la Mascota debe tener minimo 3 Caracteres'],
    required: [true, 'Debe ingresar un Nombre de Mascota'],
  },
  petCategory: {
    type: String,
    enum: ['Perros', 'Gatos', 'Aves', 'Rectiles', 'Insectos','Bovinos', 'Peces','Exoticos', 'Otros'],
    required: [true, 'Debe ingresar una Categoria'],
  },
  petDescription: {
    type: String,
    min: [3, 'La Descripcion de la Mascota debe tener minimo 3 Caracteres'],
    required: [true, 'Debe ingresar una Descripcion'],
  },
  petType: {
    type: String,
    min: [3, 'El tipo de Mascota debe tener minimo 3 Caracteres'],
    required: [true, 'Debe ingresar un Tipo de Mascota'],
  },
  petPais: {
    type: String,
    required: [true, 'Debe ingresar un Pais'],
  },
  
  publicaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "publicaciones" }]
});

usuarioSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

 
usuarioSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'No coincide con la Contraseña');
  }
  next();
});

usuarioSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});
  


const usuario= mongoose.model("usuario", usuarioSchema);

module.exports = usuario;