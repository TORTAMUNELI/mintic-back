const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  console.log("METODO GETTTT");

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  console.log("METODO POSTTTT");
  const { nombres, pApellido, correo, password } = req.body;
  const sApellido = req.body.sApellido || "";

  const usuario = new Usuario({
    nombres,
    pApellido,
    sApellido,
    correo,
    password,
  });

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();
  res.status(201).json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
};
