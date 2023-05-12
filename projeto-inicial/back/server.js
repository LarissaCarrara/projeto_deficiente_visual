//config padrao
const express = require("express");
const cors = require("cors"); //segurança do back

const iaRouters = require("./ia_route");
const app = express();

app.use(cors());
app.use(express.json());

app.use(iaRouters);

app.listen(3001, ()=>{
    console.log("rodando");
})