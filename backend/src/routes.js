const express = require('express');

const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const MensagemController = require('./controllers/MensagemController');
const AtendimentoController = require('./controllers/AtendimentoController');

//Rota de listagem de usuários, será modificada dps (usada na pt de pesquisa de usuário).
routes.get('/usuario', UsuarioController.index)

//Rota de registro do usuário
routes.post('/usuario', UsuarioController.create);

//Rota de listagem de mensagens, talvez será modificada dps.
routes.get('/mensagem', MensagemController.index)

//Rota de postagem de mensagem
routes.post('/mensagem', MensagemController.create);
module.exports = routes; 

//Rota de listagem de atendimentos, será modificada dps (usada na pt do calendário).
routes.get('/atendimento', AtendimentoController.index)

//Rota de registro do atendimento
routes.post('/atendimento', AtendimentoController.create);