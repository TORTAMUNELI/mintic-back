const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Historia = require("../models/historia");
const Comentario = require("../models/comentario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error("Rol invalido");
  }
};

const emailExiste = async (correo = "") => {
  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error("El email ya existe");
  }
};

const usuarioExistePorId = async (id) => {
  //Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error("El usuario no existe");
  }
  console.log(existeUsuario);
};

const historiaExistePorId = async (id) => {
  //Verificar si el correo existe

  const existeHistoria = await Historia.findById(id);
  if (!existeHistoria) {
    throw new Error("La historia no existe");
  }
};

const comentarioExistePorId = async (id) => {
  //Verificar si el correo existe

  const existeComentario = await Comentario.findById(id);
  if (!existeComentario) {
    throw new Error("El comentario no existe");
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  usuarioExistePorId,
  historiaExistePorId,
  comentarioExistePorId,
};
