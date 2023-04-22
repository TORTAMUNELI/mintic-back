const usuarios = require("../controllers/usuarios");
const auth = require("../controllers/auth");
const comentarios = require("../controllers/comentarios");
const historias = require("../controllers/historias");

module.exports = {
  ...usuarios,
  ...auth,
  ...comentarios,
  ...historias,
};
