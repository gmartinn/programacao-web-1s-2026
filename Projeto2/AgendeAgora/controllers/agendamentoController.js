const { readData, writeData } = require('../models/storage');

// Listar Agendamentos (Read)
exports.listar = (req, res) => {
    if (!req.session.usuario) return res.redirect('/login.html');
    
    const agendamentos = readData('agendamentos.json');
    // Filtra se for cliente, ou mostra tudo se for barbeiro/admin
    const meusAgendamentos = req.session.usuario.tipo === 'cliente' 
        ? agendamentos.filter(a => a.usuario_id === req.session.usuario.id)
        : agendamentos;

    res.json({ usuario: req.session.usuario, agendamentos: meusAgendamentos });
};

// Criar Agendamento (Create)
exports.criar = (req, res) => {
    if (!req.session.usuario) return res.status(403).send('Não autorizado');
    
    const { servico, data, hora } = req.body;
    const agendamentos = readData('agendamentos.json');

    const novoAgendamento = {
        id: Date.now(),
        usuario_id: req.session.usuario.id,
        usuario_nome: req.session.usuario.nome,
        servico,
        data,
        hora,
        status: 'pendente'
    };

    agendamentos.push(novoAgendamento);
    writeData('agendamentos.json', agendamentos);
    res.redirect('/dashboard.html');
};

// Editar Agendamento (Update)
exports.editar = (req, res) => {
    const { id } = req.params;
    const { servico, data, hora, status } = req.body;
    let agendamentos = readData('agendamentos.json');

    const index = agendamentos.findIndex(a => a.id == id);
    if (index !== -1) {
        agendamentos[index] = { ...agendamentos[index], servico, data, hora, status };
        writeData('agendamentos.json', agendamentos);
        return res.sendStatus(200);
    }
    res.status(404).send('Agendamento não encontrado.');
};

// Excluir Agendamento (Delete)
exports.excluir = (req, res) => {
    const { id } = req.params;
    let agendamentos = readData('agendamentos.json');

    agendamentos = agendamentos.filter(a => a.id != id);
    writeData('agendamentos.json', agendamentos);
    res.sendStatus(200);
};