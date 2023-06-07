const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dpnsdkhm1",
  api_key: "162486782228699",
  api_secret: "yrRKoKKkA4H1cTmPoRlwRHbkeYE",
});

const con = require("./dao/connect");

const listar = (req, res) => {
  const { produto, marca, sabor } = req.body;
  let query = `SELECT * FROM produto WHERE produto='${produto}'AND marca='${marca}' AND sabor='${sabor}'`;

  con.query(query, (err, response) => {
    if (err == undefined) {
      res.status(200).json(response).end();
    } else {
      res.status(400).json(err).end();
    }
  });
};

const listarTeste = (req, res) => {
  const { tipo, marca, sabor } = req.body;
  let query = `SELECT * FROM produto `;

  con.query(query, (err, response) => {
    if (err == undefined) {
      res.status(200).json(response).end();
    } else {
      res.status(400).json(err).end();
    }
  });
};

const generateHash = () => {
  return (
    Math.random().toString(5).substring(1, 4) +
    Math.random().toString(5).substring(1, 4)
  );
};

const upload_imagem = (req, res) => {
  const { url } = req.body;
  const buffer = Buffer.from(url, "binary");
  console.log(buffer);
  // Salvar o buffer em um arquivo temporário
  fs.writeFile("./temp.png", buffer, (err) => {
    if (err) {
      console.error("Erro ao salvar o arquivo:", err);
      return res.status(500).send("Erro ao salvar o arquivo");
    }

    console.log("Arquivo salvo com sucesso");
    res.status(200).send("Arquivo salvo com sucesso");
  });
  //   cloudinary.uploader.upload("temp.jpg", (error, result) => {
  //     if (error) {
  //       console.error("Erro ao enviar a imagem:", error);
  //     } else {
  //       console.log("Imagem enviada com sucesso!");
  //       console.log("URL da imagem:", result.secure_url);
  //     }
  //   });
};
module.exports = {
  listar,
  listarTeste,
  upload_imagem,
};
