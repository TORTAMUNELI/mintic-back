const { request, response } = require("express");
const Comentario = require("../models/comentario");

const comentariosGet = async (req = request, res = response) => {
  const comentarios = await Comentario.find({
    activo: true,
    estado: "solicitado",
  });

  res.json({ comentarios });
};

const comentariosPost = async (req = request, res = response) => {
  const { contenido } = req.body;
  const { _id: usuario } = req.usuarioAuth;
  const { id: historia } = req.params;

  const comentario = new Comentario({
    contenido,
    usuario,
    historia,
  });

  await comentario.save();

  res.status(201).json({ comentario });
};

const comentariosPut = async (req = request, res = response) => {
  const { contenido } = req.body;
  const { id: comentario } = req.params;

  const nuevoComentario = await Comentario.findByIdAndUpdate(comentario, {
    contenido,
    estado: "solicitado",
  });

  res.json({ nuevoComentario });
};

const comentariosDelete = async (req = request, res = response) => {
  const { id: comentario } = req.params;

  const comentarioEliminado = await Comentario.findByIdAndUpdate(comentario, {
    activo: false,
  });

  res.json({ comentarioEliminado });
};

const evaluarComentario = async (req = request, res = response) => {
  const { id } = req.params;
  const { veredicto } = req.body;
  let comentario;

  console.log("POR AQUI PASOf " + veredicto);
  if (veredicto === "aprobado") {
    comentario = await Comentario.findByIdAndUpdate(id, {
      estado: "visible",
    });
  } else if (veredicto === "rechazado") {
    comentario = await Comentario.findByIdAndUpdate(id, {
      estado: "rechazado",
    });
  }

  res.json({ comentario });
};

module.exports = {
  comentariosGet,
  comentariosPost,
  comentariosPut,
  comentariosDelete,
  evaluarComentario,
};
