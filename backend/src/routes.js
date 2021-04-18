const express = require('express');

const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const MensagemController = require('./controllers/MensagemController');
const AtendimentoController = require('./controllers/AtendimentoController');

//Rota de listagem de usuários
routes.get('/usuario/:informacao', UsuarioController.index)

//Rota de registro do usuário
routes.post('/usuario', UsuarioController.create);

//Rota de Login
routes.post('/usuario/login', UsuarioController.login);

//Rota de atualizar usuário
routes.put('/usuario', UsuarioController.edit)

//Rota de listagem de mensagens.
routes.get('/mensagem', MensagemController.index)

//Rota de postagem de mensagem
routes.post('/mensagem', MensagemController.create);

//Rota de listagem de atendimentos (usada na pt do calendário).
routes.get('/atendimento', AtendimentoController.index)

//Rota de registro do atendimento
routes.post('/atendimento', AtendimentoController.create);

//Rota de atualizar atendimento
routes.put('/atendimento', AtendimentoController.edit)
module.exports = routes; 

