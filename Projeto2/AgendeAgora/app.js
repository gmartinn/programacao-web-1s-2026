const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();

// Middlewares para ler formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de Sessão (Login/Logout)
app.use(session({
    secret: 'chave_secreta_barbearia',
    resave: false,
    saveUninitialized: true
}));

// Servir arquivos estáticos e views
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Rotas do Sistema
app.use('/', authRoutes);
app.use('/dashboard', agendamentoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));