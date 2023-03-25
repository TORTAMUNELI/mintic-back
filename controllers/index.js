const usuarios = require("../controllers/usuarios");
const auth = require("../controllers/auth");
const comentarios = require("../controllers/comentarios");

module.exports = {
  ...usuarios,
  ...auth,
  ...comentarios,
};
