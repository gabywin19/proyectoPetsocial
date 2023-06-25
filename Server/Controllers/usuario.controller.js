const usuario = require("../Models/usuario.models");
const publicaciones = require("../Models/publicaciones.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { email,password,confirmPassword,petName,petCategory,petDescription,petType,petPais} = req.body
    const newUsers = await usuario.create({
      imagen: req.file,
      email,
      password,
      confirmPassword,
      petName,
      petCategory,
      petDescription,
      petType,
      petPais,
     
    });
    res.json(newUsers);
  } catch (error) {
    res.status(500).json({
      msg: "Error al crear usuario",
      error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usuario.findOne({ email });

    if (user === null) {
      return res.status(400).json({ msg: "usuario no encontrado" });
    }

    const validate = await bcrypt.compare(password, user.password);

    if (!validate) {
      return res.status(403).json({ msg: "Contaseña Incorrecta" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("token", token, process.env.SECRET_KEY, {
        httpOnly: true,
      })
      .json({ msg: "success!" });
  } catch (e) {
    res.json({
      msg: "Error al Iniciar Sesion",
      e,
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const { email } = await jwt.verify(
      req.cookies.token,
      process.env.SECRET_KEY
    );
    await usuario.findOne({ email: email });
    res.clearCookie("token").json({ msg: "Sesión Cerrada" });
  } catch (error) {
    res.status(403).json({
      msg: "Error al Cerrar Sesion",
      error,
      token: req.cookies,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    const updateUsuario = await usuario.findOne({ _id: id });

    if (req.body.password && req.body.confirmPassword) {
      updateUsuario.password = req.body.password;
      updateUsuario.confirmPassword = req.body.confirmPassword;
    } else {
      updateUsuario.confirmPassword = updateUsuario.password;
    }
    updateUsuario.email = req.body.email;
    updateUsuario.petName = req.body.petName;
    updateUsuario.petCategory = req.body.petCategory;
    updateUsuario.petDescription = req.body.petDescription;
    updateUsuario.petType = req.body.petType;
    updateUsuario.petPais = req.body.petPais;

    await updateUsuario.save();
    res.json({
      message: "Se Actualizo El Perfil de la Mascota",
    });
  } catch (error) {
    res.status(500).json({
      id: req.params.id,
      message: "No Hemos Podido Actualizar el Perfil de la  Mascota",
      error,
    });
  }
};

module.exports.get = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    const oneUsuario = await usuario.findOne({ _id: id });
    const getPosts = await publicaciones
      .find({ usuario: oneUsuario._id })
      .sort({ createdAt: -1 })
      .populate('usuario')
      .populate({
        path: "comentarios",
        model: "comentarios",
        options: { sort: { createdAt: -1 } },
      });

    res.json({ ...oneUsuario._doc, publicaciones: getPosts });
  } catch (error) {
    res.status(500).json({
      id: req.params.id,
      message: "No Hemos Podido Encontrar el Usuario",
      error,
    });
  }
};
