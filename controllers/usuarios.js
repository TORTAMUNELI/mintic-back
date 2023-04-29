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

const usuarioGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  if (!usuario)
    return res.status(404).json({ msg: "No se encontro el usuario" });

  res.json({ usuario });
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

const usuariosPutRol = async (req = request, res = response) => {
  const { id, nuevoRol } = req.body;

  const usuario = await Usuario.findByIdAndUpdate(id, { rol: nuevoRol });
  res.json({ usuario });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPutRol,
  usuarioGetById,
};
