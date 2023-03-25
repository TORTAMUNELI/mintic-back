const { request, response } = require("express");
const Comentario = require("../models/comentario");

const comentariosPost = async (req = request, res = response) => {
  const { contenido } = req.body;
  const { _id: usuario } = req.usuarioAuth;

  const comentario = new Comentario({
    contenido,
    usuario,
  });

  await comentario.save();

  res.status(201).json({ comentario });
};

module.exports = {
  comentariosPost,
};
