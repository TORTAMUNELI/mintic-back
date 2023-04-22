const { request, response } = require("express");
const Historia = require("../models/historia");

const historiasPut = async (req = request, res = response) => {
  const { visble, activo, usuario, ...historia } = req.body;
  const { id } = req.params;
  const usuarioAuth = req.usuarioAuth._id;

  const { usuario: usuarioCreador } = await Historia.findById(id);

  if (usuarioAuth != usuarioCreador.toString()) {
    res.json({
      msg: "El ususario no es el creador de la historia, por lo tanto no puede modificarla.",
    });
  }

  const data = {
    ...historia,
    estado: "solicitado",
  };

  const nuevaHistoria = await Historia.findByIdAndUpdate(id, data);

  res.json({
    nuevaHistoria,
  });
};

const historiasPost = async (req = request, res = response) => {
  const { titulo, contenido } = req.body;
  const usuario = req.usuarioAuth._id;
  const historia = new Historia({
    titulo,
    contenido,
    usuario,
  });

  await historia.save();
  res.status(201).json({
    historia,
  });
};

const historiasDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const usuarioAuth = req.usuarioAuth._id;

  const { usuario: usuarioCreador } = await Historia.findById(id);

  if (usuarioAuth != usuarioCreador.toString()) {
    res.json({
      msg: "El ususario no es el creador de la historia, por lo tanto no puede eliminarla.",
    });
  }

  const data = {
    activo: false,
  };

  const historiaEliminada = await Historia.findByIdAndUpdate(id, data);
  res.json({
    historiaEliminada,
  });
};

const evaluarHistoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { veredicto } = req.body;
  let historia;
  if (veredicto === "aprobado") {
    historia = await Historia.findByIdAndUpdate(id, {
      estado: "visible",
    });
  } else if (veredicto === "rechazado") {
    historia = await Historia.findByIdAndUpdate(id, {
      estado: "rechazado",
    });
  }

  res.json({ historia });
};

const editarVisibilidad = async (req = request, res = response) => {
  const { id } = req.params;
  const { edicion } = req.body;
  const historia = await Historia.findByIdAndUpdate(id, {
    estado: edicion,
  });
  res.json({ historia });
};

module.exports = {
  historiasPost,
  historiasPut,
  historiasDelete,
  evaluarHistoria,
  editarVisibilidad,
};
