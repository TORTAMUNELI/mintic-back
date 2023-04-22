const { Schema, model } = require("mongoose");

const ComentarioSchema = Schema({
  contenido: {
    type: String,
    required: [true, "El contenido es obligatorio"],
  },
  estado: {
    type: "String",
    default: "solicitado",
  },
  activo: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  historia: {
    type: Schema.Types.ObjectId,
    ref: "Historia",
    required: true,
  },
});

ComentarioSchema.methods.toJSON = function () {
  const { __v, _id, ...comentario } = this.toObject();
  comentario.uid = _id;
  return comentario;
};

module.exports = model("Comentario", ComentarioSchema);
