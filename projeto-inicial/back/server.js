//config padrao
const express = require("express");
const cors = require("cors"); //segurança do back
const app = express();

app.use(cors());

const iaRouters = require("./ia_route");

app.use(express.json());

app.use(iaRouters);

app.listen(3001, () => {
  console.log("rodando");
});
