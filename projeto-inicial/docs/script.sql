DROP DATABASE IF EXISTS ia;
CREATE DATABASE ia;
USE ia;

CREATE TABLE produto(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(40) NOT NULL,
    marca VARCHAR(40) NOT NULL,
    sabor VARCHAR(40),
    preco FLOAT NOT NULL,
    descricao VARCHAR(50) 
);

insert into produto values (
    null, 
    "salgadinho", 
    "lays", 
    "Sabor Cebola e Salsa",
    8.00, 
    "salgadinho lays de cebola e salsa"
);