-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "produto" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "sabor" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
