const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal - formulário
app.get('/', (req, res) => {
    res.render('form', { errors: [], data: {} });
});

// Rota de envio
app.post('/agendamento', (req, res) => {
    const data = req.body;
    let errors = [];

    // Validação: campos obrigatórios
    const requiredFields = [
        'nome', 'sobrenome', 'cpf', 'nascimento',
        'telefone', 'cep', 'endereco',
        'clinica', 'especialidade', 'dataHora'
    ];

    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`O campo ${field} é obrigatório.`);
        }
    });

    // Validação de data futura
    if (data.dataHora) {
        const agora = new Date();
        const dataAgendamento = new Date(data.dataHora);

        if (dataAgendamento <= agora) {
            errors.push('A data do agendamento deve ser futura.');
        }
    }

    // Se houver erros, volta pro formulário
    if (errors.length > 0) {
        return res.render('form', { errors, data });
    }

    // Se estiver tudo certo
    res.render('resultado', { data });
});

// Inicialização
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});