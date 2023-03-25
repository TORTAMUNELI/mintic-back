const { Router } = require("express");
const { check } = require("express-validator");
const { comentariosPost } = require("../controllers");
const { validarJWT, validarCampos, tieneRol } = require("../middlewares");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("contenido", "El contenido es obligatorio").not().isEmpty(),
    tieneRol("USER"),
    validarCampos,
  ],
  comentariosPost
);

module.exports = router;
