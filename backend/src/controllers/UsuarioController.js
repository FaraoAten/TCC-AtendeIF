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
    
    //Rota de listagem de usuários, será modificada dps (usada na pt de pesquisa de usuário).
    async index(request,response) {
        const usuario = await connection('usuario').select('*');
        
        return response.json(usuario);
    }
}

