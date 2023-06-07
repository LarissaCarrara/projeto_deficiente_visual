const prisma = require("./dao/connect");

const listar = async (req, res) => {
  const produtos = await prisma.Produto.findMany({});
  res.status(200).json(produtos).end();
};

const criar = async (req, res) => {
  const { preco, descricao, sabor, marca, produto } = req.body;

  const p = await prisma.Produto.create({
    data: {
      preco,
      descricao,
      sabor,
      marca,
      produto,
    },
  });

  res.status(200).json(p).end();
};

module.exports = {
  listar,
  criar,
};
