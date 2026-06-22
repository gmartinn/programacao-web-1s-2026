const bcrypt = require('bcryptjs');
const { readData, writeData } = require('../models/storage');

exports.cadastrar = (req, res) => {
    const { nome, email, senha, telefone, tipo } = req.body;
    const usuarios = readData('usuarios.json');

    if (usuarios.find(u => u.email === email)) {
        return res.status(400).send('E-mail já cadastrado.');
    }

    const hashedSenha = bcrypt.hashSync(senha, 10);
    const novoUsuario = { id: Date.now(), nome, email, senha: hashedSenha, telefone, tipo: tipo || 'cliente' };
    
    usuarios.push(novoUsuario);
    writeData('usuarios.json', usuarios);
    res.redirect('/login.html');
};

exports.login = (req, res) => {
    const { email, senha } = req.body;
    const usuarios = readData('usuarios.json');
    const usuario = usuarios.find(u => u.email === email);

    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
        req.session.usuario = { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo };
        return res.redirect('/dashboard');
    }
    res.status(401).send('Credenciais inválidas.');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
};