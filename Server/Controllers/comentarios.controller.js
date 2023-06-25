const comentarios= require('../Models/comentarios.models');
const publicaciones= require('../Models/publicaciones.models');
const jwt = require("jsonwebtoken");

module.exports.create= async(req,res)=>{
    try {
      const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      const comment= await comentarios.create({ publicaciones: req.params.id, comentario: req.body.comentario, usuario: id });

      const post = await publicaciones.findById(req.params.id);

      await post.comentarios.push(comment);

      post.save();
      res.json({
        message: 'Comentario con Exito!!',
        post,
      })
    } catch (error) {
      res.status(500).json({
        body: req.body,
        message:'Error al Comentar',
        error,
    });
  }
};

module.exports.remove= async(req,res)=>{
  try {
    /**
     * Obtener ID de la cookie
     */
    const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);

    /**
     * Buscar comentario a eliminar
     */
    const comment = await comentarios.findById(req.params.id);

    /**
     * Validar mismo ID del creador del comentario y de la cookie
     */
    if (id != comment.usuario) {
      return res.status(403).json({
        message: "No puedes eliminar este comentario",
      })
    }

    await comentarios.deleteOne( { _id: req.params.id } );
    res.json({
      message: "Comentario Eliminada"
    })
  } catch (error) {
    res.status(500).json({
      id: req.params.id,
      message:'No hemos podido Eliminar El Comentario',
      error,
  });
}
};
