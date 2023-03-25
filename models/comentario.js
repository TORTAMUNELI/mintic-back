const { Schema, model } = require("mongoose");

const ComentarioSchema = Schema({
  contenido: {
    type: String,
    required: [true, "El contenido es obligatorio"],
  },
  visible: {
    type: Boolean,
    default: false,
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

  //   historia: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Historia",
  //     required: true,
  //   },
});

module.exports = model("Comentario", ComentarioSchema);
