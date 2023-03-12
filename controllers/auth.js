const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no existe",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -estado",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos -contraseña",
      });
    }

    res.json({ usuario, logged: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
};

module.exports = {
  login,
};
