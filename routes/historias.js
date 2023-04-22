const { Router } = require("express");
const { check } = require("express-validator");
const {
  historiasPost,
  historiasPut,
  historiasDelete,
  evaluarHistoria,
  editarVisibilidad,
} = require("../controllers");
const { historiaExistePorId } = require("../helpers");
const {
  validarJWT,
  validarCampos,
  tieneRol,
  esAdminRol,
} = require("../middlewares");

const router = Router();

router.put(
  "/:id",
  [validarJWT, check("id").custom(historiaExistePorId), validarCampos],
  historiasPut
);

router.put(
  "/evaluacion/:id",
  [
    validarJWT,
    tieneRol("MOD"),
    check("id").custom(historiaExistePorId),
    check("veredicto").not().isEmpty(),
    validarCampos,
  ],
  evaluarHistoria
);

router.put(
  "/visibilidad/:id",
  [
    validarJWT,
    check("edicion").not().isEmpty(),
    check("id").custom(historiaExistePorId),
    validarCampos,
  ],
  editarVisibilidad
);

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El titulo es obligatorio.").not().isEmpty(),
    check("contenido", "El contenido es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  historiasPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id").custom(historiaExistePorId),
    esAdminRol,
    validarCampos,
  ],
  historiasDelete
);

module.exports = router;
