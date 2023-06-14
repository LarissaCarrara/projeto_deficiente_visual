const express = require("express");

const router = express.Router();
const Ia = require("./ia.controller");

router.get("/listar", Ia.listar);
router.post("/buscar", Ia.buscar);
router.post("/criar", Ia.criar);

module.exports = router;
