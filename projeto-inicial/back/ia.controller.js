const con = require("./dao/connect");

const listar = (req, res) => {

    const { produto, marca, sabor } = req.body;
    let query = `SELECT * FROM produto WHERE tipo='${produto}'AND marca='${marca}' AND sabor='${sabor}'`;


    con.query(query, (err, response) => {
        if (err == undefined) {
            res.status(200).json(response).end();
        } else {
            res.status(400).json(err).end();
        }
    })
}

const listarTeste = (req, res) => {

    const { tipo, marca, sabor } = req.body;
    let query = `SELECT * FROM produto `;


    con.query(query, (err, response) => {
        if (err == undefined) {
            res.status(200).json(response).end();
        } else {
            res.status(400).json(err).end();
        }
    })
}

module.exports = {
    listar,
    listarTeste
}

