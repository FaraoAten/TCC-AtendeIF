// arquivo onde são definidas as rotas de conexão do front com o back, para que o programa seja RESTful e saiba o que fazer ao receber cada path.

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
routes.get('/usuario/:informacao', UsuarioController.listarUsuarios);

//Rota de registro do usuário
routes.post('/usuario', UsuarioController.cadastrarUsuarios);

//Rota de Login
routes.post('/usuario/login', UsuarioController.login);

//Rota de atualizar usuário
routes.put('/usuario', UsuarioController.editarUsuarios);

//Rota de atualizar campo primeiro_login
routes.put('/usuario/primeiroLogin', UsuarioController.primeiroLogin);

//Rota de listagem de mensagens.
routes.get('/mensagem', MensagemController.listarMensagem);

//Rota de registro de mensagem
routes.post('/mensagem', MensagemController.cadastrarMensagem);

//Rota de listagem de atendimentos de professor.
routes.get('/atendimento/professor', AtendimentoController.listarAtendimentoProf);

//Rota de listagem de atendimentos de estudante (visualização do professor ao pesquisar aluno).
routes.get('/atendimento/professorEstudante', AtendimentoController.listarAtendimentoEstuProf);

//Rota de listagem de atendimentos de estudante.
routes.get('/atendimento/estudante', AtendimentoController.listarAtendimentoEstu);

//Rota de criação das mensagens de pedido de cancelamento de atendimento
routes.get('/atendimento/mensagemPedidoCancelamento', AtendimentoController.montarMensagemPedidoCancelamento);

//Rota de criação das mensagens de cancelamento de atendimento
routes.get('/atendimento/mensagemCancelamento', AtendimentoController.montarMensagemCancelamento);

//Rota de criação das mensagens de alteração de atendimento
routes.get('/atendimento/mensagemAlteraracao', AtendimentoController.montarMensagemAlteraracao);

//Rota de registro do atendimento
routes.post('/atendimento', AtendimentoController.cadastrarAtendimentos);

//Rota de atualizar atendimento
routes.put('/atendimento', AtendimentoController.editarAtendimentos);

//Rota de cancelar atendimento
routes.put('/atendimento/cancelar', AtendimentoController.cancelarAtendimentos);

//Rota de listagem de arquivos
routes.get('/urls', UrlsController.listarUrls);

//Rota de verificação de existencia de foto vinculada ao usuário
routes.get('/urls/foto', UrlsController.verificarFotoCadastrada);

//Rota de registro de urls (upload de arquivos)
routes.post('/urls', upload.single('URL'), UrlsController.cadastrarUrls);

//Rota de deletar urls
routes.delete('/urls', UrlsController.deletarUrls);

module.exports = routes; 

