const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.get('/', agendamentoController.listar);
router.post('/novo', agendamentoController.criar);
router.put('/editar/:id', agendamentoController.editar);
router.delete('/deletar/:id', agendamentoController.excluir);

module.exports = router;