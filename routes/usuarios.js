const { Router } = require("express");
const { check } = require("express-validator");

const { usuariosGet, usuariosPost } = require("../controllers");

const router = Router();

router.get("/", usuariosGet);

router.post("/", usuariosPost);

module.exports = router;
