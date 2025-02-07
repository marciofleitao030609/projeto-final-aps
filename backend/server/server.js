const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* 📌 Listar todos os clientes */
app.get("/clientes", (req, res) => {
    db.all("SELECT * FROM clientes", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

/* 📌 Adicionar um novo cliente */
app.post("/clientes", (req, res) => {
    const { nome, telefone, endereco } = req.body;
    db.run("INSERT INTO clientes (nome, telefone, endereco) VALUES (?, ?, ?)",
        [nome, telefone, endereco],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        });
});

/* 📌 Listar pizzas */
app.get("/pizzas", (req, res) => {
    db.all("SELECT * FROM pizzas", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

/* 📌 Criar um pedido */
app.post("/pedidos", (req, res) => {
    const { cliente_id, pizza_id, quantidade } = req.body;
    db.run("INSERT INTO pedidos (cliente_id, pizza_id, quantidade) VALUES (?, ?, ?)",
        [cliente_id, pizza_id, quantidade],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        });
});

/* 📌 Listar pedidos */
app.get("/pedidos", (req, res) => {
    db.all("SELECT pedidos.id, clientes.nome AS cliente, pizzas.nome AS pizza, pedidos.quantidade, pedidos.status FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id JOIN pizzas ON pedidos.pizza_id = pizzas.id", [],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
});

app.listen(3001, () => {
    console.log("🚀 Servidor rodando na porta 3001!");
});
