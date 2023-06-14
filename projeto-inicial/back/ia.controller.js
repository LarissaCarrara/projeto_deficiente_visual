const prisma = require("./dao/connect");

const listar = async (req, res) => {
  const produtos = await prisma.Produto.findMany({});
  res.status(200).json(produtos).end();
};

const buscar = async (req, res) => {
  const { produto, marca, sabor } = req.body;
  const where = {
    produto,
    marca,
    sabor,
  };
  try {
    const produtos = await prisma.Produto.findMany({
      where,
    });
    if (!produtos)
      res.status(404).json({ message: "Produto não encontrado" }).end();
    res.status(200).json(produtos).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error).end();
  }
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
  buscar,
};
