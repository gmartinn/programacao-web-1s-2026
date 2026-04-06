const express = require('express');
const app = express();

const PORT = 3000;

// "Banco de dados" em memória
let estoque = [];

// Rota: adicionar produto
app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;

    const existe = estoque.find(p => p.id === id);
    if (existe) {
        return res.send('Produto já existe!');
    }

    estoque.push({
        id,
        nome,
        qtd: parseInt(qtd)
    });

    res.send('Produto adicionado com sucesso!');
});

// Rota: listar produtos
app.get('/listar', (req, res) => {
    res.json(estoque);
});

// Rota: remover produto
app.get('/remover/:id', (req, res) => {
    const { id } = req.params;

    const index = estoque.findIndex(p => p.id === id);

    if (index === -1) {
        return res.send('Produto não encontrado!');
    }

    estoque.splice(index, 1);

    res.send('Produto removido com sucesso!');
});

// Rota: editar quantidade
app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;

    const produto = estoque.find(p => p.id === id);

    if (!produto) {
        return res.send('Produto não encontrado!');
    }

    produto.qtd = parseInt(qtd);

    res.send('Quantidade atualizada!');
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});