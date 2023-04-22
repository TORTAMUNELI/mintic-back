const { Schema, model } = require("mongoose");

const HistoriaSchema = Schema({
  titulo: {
    type: String,
    required: [true, "El título es obligatorio."],
  },
  contenido: {
    type: String,
    required: [true, "El contenido es obligatorio."],
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
});

HistoriaSchema.methods.toJSON = function () {
  const { __v, _id, ...historia } = this.toObject();
  historia.uid = _id;
  return historia;
};

module.exports = model("Historia", HistoriaSchema);
