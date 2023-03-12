const usuarios = require("../controllers/usuarios");
const auth = require("../controllers/auth");

module.exports = {
  ...usuarios,
  ...auth,
};
