const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos, validarJWT, tieneRol } = require("../middlewares");
const { esRolValido, emailExiste, usuarioExistePorId } = require("../helpers");
const { usuariosGet, usuariosPost, usuariosPutRol } = require("../controllers");

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

router.put(
  "/",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom((id) => usuarioExistePorId(id)),
    check("nuevoRol").custom((nuevoRol) => esRolValido(nuevoRol)),
    tieneRol("ADMIN"),
    validarCampos,
  ],
  usuariosPutRol
);

module.exports = router;
