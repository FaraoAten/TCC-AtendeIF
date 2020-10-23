const connection = require('../database/connection');

module.exports = {
    //Rota de registro do usuário
    async create(request, response){
        const {num_matricula, email, senha, nome, tipo} = request.body;

        await connection('usuario').insert({
            num_matricula, 
            email, 
            senha, 
            nome, 
            tipo
        })

        return response.json({num_matricula, email, senha, nome, tipo}); //essa resposta só para testes.
        },
    
    //Rota de listagem de usuários (usada na pt de pesquisa de usuário).
    async index(request,response) {
        const informacao = request.body; //PEGA O QUE FOI DIGITADO NA BARRA DE PESQUISA
        const usuario = await connection('usuario').select('*').where('%num_matricula%',informacao).orWhere('%nome%',informacao);//RESULTA O SER PESQUISADO
        
        return response.json(usuario);
    }
}

