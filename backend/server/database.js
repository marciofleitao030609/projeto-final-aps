const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pizzaria.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL UNIQUE,
        endereco TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pizzas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        ingredientes TEXT NOT NULL,
        tamanho TEXT CHECK (tamanho IN ('média', 'grande', 'gigante')) NOT NULL,
        preco REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        pizza_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL CHECK (quantidade > 0),
        status TEXT CHECK (status IN ('pendente', 'preparando', 'entregue')) DEFAULT 'pendente',
        FOREIGN KEY (cliente_id) REFERENCES clientes (id),
        FOREIGN KEY (pizza_id) REFERENCES pizzas (id)
    )`);
});

module.exports = db;

