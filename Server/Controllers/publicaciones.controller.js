const publicaciones = require("../Models/publicaciones.models");
const jwt = require("jsonwebtoken");

module.exports.create = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    const { pensamiento } = req.body

    const newPublicaciones = await publicaciones.create({
      pensamiento,
      usuario: id,
      imagen: req.file,
    });

    res.json({
      message: "Publicación con Exito!!",
    });
  } catch (error) {
    res.status(500).json({
      body: req.body,
      message: "Error al Publicar",
      error,
    });
  }
};

module.exports.index = async (req, res) => {
  try {
    const verPublicaciones = await publicaciones
      .find()
      .populate('usuario')
      .populate({ path: 'comentarios', model: 'comentarios', options: { sort: { createdAt: -1 } } })
      .exec();

    res.json(verPublicaciones.reverse());
  } catch (error) {
    res.status(500).json({
      message: "No Hemos Podido ver las Publicaciones",
      error,
    });
  }
};

module.exports.remove = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: "No se puede eliminar",
      });
      return;
    }

    const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);

    const publicacion = await publicaciones
      .findOne({ _id: req.params.id })
      .populate({ path: "usuario", model: "usuario" })
      .exec();

    if (!publicacion) {
      res.status(404).json({
        message: "La publicación no existe",
      });
      return;
    }

    if (publicacion.usuario._id != id) {
      res.status(401).json({
        message: "No tienes autorización para eliminar esta publicación",
      });
      return;
    }

    const publicacionesDelete = await publicaciones.deleteOne({
      _id: req.params.id,
    });
    res.json({
      message: "Publicación Eliminada",
    });
  } catch (error) {
    res.status(500).json({
      id: req.params.id,
      message: "No hemos podido Eliminar la Publicación",
      error,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);

    const publicacion = await publicaciones
      .findOne({ _id: req.params.id })
      .populate({ path: "usuario", model: "usuario" })
      .exec();

    if (!publicacion) {
      res.status(404).json({
        message: "La publicación no existe",
      });
      return;
    }

    if (publicacion.usuario._id != id) {
      res.status(401).json({
        message: "No tienes Autorización para Editar esta Publicación",
      });
      return;
    }
    const updatePublicaciones = await publicaciones.findOne({
      _id: req.params.id,
    });

    updatePublicaciones.pensamiento = req.body.pensamiento;

    await updatePublicaciones.save();
    res.json({
      message: "Se Actualizo el Pensamiento",
    });
  } catch (error) {
    res.status(500).json({
      id: req.params.id,
      message: "No Hemos podido Actializar el Pensamiento",
      error,
    });
  }
};

module.exports.get = async (req, res) => {
  try {
    const onePublicaciones = await publicaciones.findOne({
      _id: req.params.id,
    });
    res.json(onePublicaciones);
  } catch (error) {
    res.status(500).json({
      id: req.params.id,
      message: "No hemos podido encontrar la Mascota",
      error,
    });
  }
};
