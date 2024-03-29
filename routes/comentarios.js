const { Router } = require("express");
const { check } = require("express-validator");
const {
  comentariosPost,
  comentariosPut,
  comentariosDelete,
  evaluarComentario,
  comentariosGet,
  comentariosGetVisibles,
  editarVisibilidadCom,
} = require("../controllers");
const {
  validarJWT,
  validarCampos,
  tieneRol,
  esAdminRol,
} = require("../middlewares");
const { historiaExistePorId, comentarioExistePorId } = require("../helpers");

const router = Router();

router.get("/", [validarJWT, tieneRol("MOD"), validarCampos], comentariosGet);

router.get("/visibles/:id", [validarJWT], comentariosGetVisibles);

router.put(
  "/:id",
  [
    validarJWT,
    check("contenido", "El contenido es obligatorio").not().isEmpty(),
    tieneRol("USER"),
    check("id").custom(comentarioExistePorId),
    validarCampos,
  ],
  comentariosPut
);

router.put(
  "/evaluacion/:id",
  [
    validarJWT,
    tieneRol("MOD"),
    check("id").custom(comentarioExistePorId),
    check("veredicto").not().isEmpty(),
    validarCampos,
  ],
  evaluarComentario
);

router.put(
  "/visibilidad/:id",
  [
    validarJWT,
    check("edicion").not().isEmpty(),
    check("id").custom(comentarioExistePorId),
    validarCampos,
  ],
  editarVisibilidadCom
);

router.post(
  "/:id",
  [
    validarJWT,
    check("contenido", "El contenido es obligatorio").not().isEmpty(),
    check("id").custom(historiaExistePorId),
    tieneRol("USER"),
    validarCampos,
  ],
  comentariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id").custom(esAdminRol),
    check("id").custom(historiaExistePorId),
    validarCampos,
  ],
  comentariosDelete
);

module.exports = router;
