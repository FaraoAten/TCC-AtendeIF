const express = require('express');

const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();

const upload = multer(uploadConfig);

const UsuarioController = require('./controllers/UsuarioController');
const MensagemController = require('./controllers/MensagemController');
const AtendimentoController = require('./controllers/AtendimentoController');
const UrlsController = require('./controllers/UrlsController');

//Rota de listagem de usuários
routes.get('/usuario/:informacao', UsuarioController.index)

//Rota de registro do usuário
routes.post('/usuario', UsuarioController.create);

//Rota de Login
routes.post('/usuario/login', UsuarioController.login);

//Rota de atualizar usuário
routes.put('/usuario', UsuarioController.edit);

//Rota de atualizar campo primeiro_login
routes.put('/usuario/primeiroLogin', UsuarioController.firstLogin);

//Rota de listagem de mensagens.
routes.get('/mensagem', MensagemController.index);

//Rota de postagem de mensagem
routes.post('/mensagem', MensagemController.create);

//Rota de listagem de atendimentos de professor.
routes.get('/atendimento/professor', AtendimentoController.listaAtendimentoProf);

//Rota de listagem de atendimentos de pedagogia.
routes.get('/atendimento/professorEstudante', AtendimentoController.listaAtendimentoEstuProf);

//Rota de listagem de atendimentos de estudante.
routes.get('/atendimento/estudante', AtendimentoController.listaAtendimentoEstu);

routes.get('/atendimento/mensagem', AtendimentoController.montarMensagem);

routes.get('/atendimento/mensagemEstu', AtendimentoController.montarMensagemEstu);

routes.get('/atendimento/mensagemAlterar', AtendimentoController.montarMensagemAlterar);

//Rota de registro do atendimento
routes.post('/atendimento', AtendimentoController.create);

//Rota de atualizar atendimento
routes.put('/atendimento', AtendimentoController.edit);

//Rota de cancelar atendimento
routes.put('/atendimento/cancelar', AtendimentoController.cancelar);

//Rota de listagem de arquivos
routes.get('/urls', UrlsController.index);

routes.get('/urls/foto', UrlsController.fotoCadastrada);

//Rota de upload de arquivos
routes.post('/urls', upload.single('URL'), UrlsController.create);

//Rota de delete de arquivos
routes.delete('/urls', UrlsController.delete);

module.exports = routes; 

