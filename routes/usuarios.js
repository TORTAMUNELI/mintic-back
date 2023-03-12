const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");
const { esRolValido, emailExiste } = require("../helpers");
const { usuariosGet, usuariosPost } = require("../controllers");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("pApellido", "El primer apellido es obligatorio").not().isEmpty(),
    check("password", "El password debe contener más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom((correo) => emailExiste(correo)),
    validarCampos,
  ],
  usuariosPost
);

module.exports = router;
