const express = require('express');

const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();

const upload = multer(uploadConfig);

const UsuarioController = require('./controllers/UsuarioController');
const MensagemController = require('./controllers/MensagemController');
const AtendimentoController = require('./controllers/AtendimentoController');
const UrlController = require('./controllers/UrlController');

//Rota de listagem de usuários (usada na pt de pesquisa de usuário).
routes.get('/usuario', UsuarioController.index)

//Rota de registro do usuário
routes.post('/usuario', UsuarioController.create);

//Rota de listagem de mensagens.
routes.get('/mensagem', MensagemController.index)

//Rota de postagem de mensagem
routes.post('/mensagem', MensagemController.create);

//Rota de listagem de atendimentos (usada na pt do calendário).
routes.get('/atendimento', AtendimentoController.index)

//Rota de registro do atendimento
routes.post('/atendimento', AtendimentoController.create);

//Rota de listagem de arquivos
routes.get('/urls', UrlController.index);

//Rota de upload de arquivos
routes.post('/urls', upload.single('url'),UrlController.create);
module.exports = routes; 