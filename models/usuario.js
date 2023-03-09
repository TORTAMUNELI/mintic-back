const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombres: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  p_apellido: {
    type: String,
    required: [true, "El primer apellido es obligatorio"],
  },
  s_apellido: {
    type: String,
    required: [true, "El segundo apellido es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  rol: {
    type: String,
    required: true,
    default: "USER",
    enum: ["ADMIN", "USER", "MOD"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
