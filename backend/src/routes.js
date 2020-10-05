const express = require('express');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/usuario', async(request,response) => {
    const {num_matricula, email, senha, nome, tipo} = request.body;

    await connection('usuario').insert({
        num_matricula, 
        email, 
        senha, 
        nome, 
        tipo
    })

    return response.json({email, senha}); //essa resposta só para testes.
});

module.exports = routes; 