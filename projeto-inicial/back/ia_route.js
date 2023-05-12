const express = require("express");

const router = express.Router();
const Ia = require("./ia.controller");

router.get('/listarTodos', Ia.listarTeste);
router.post('/listar', Ia.listar);

module.exports = router;