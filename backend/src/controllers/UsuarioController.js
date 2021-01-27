const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //Rota de registro do usuário
    async create(request, response){
        const {num_matricula, email, senha, nome, tipo} = request.body;
        const id_usuario = crypto.randomBytes(4).toString('HEX');

        await connection('usuario').insert({
            id_usuario,
            num_matricula, 
            email, 
            senha, 
            nome, 
            tipo
        })

        return response.status(204).send(); 
        },
    
    //Rota de listagem de usuários (usada na pt de pesquisa de usuário).
    async index(request,response) {
        const informacao = request.body.informacao; //PEGA O QUE FOI DIGITADO NA BARRA DE PESQUISA

        const usuario = await connection('usuario').select('*').where('num_matricula', 'like', '%'+informacao+'%').orWhere('nome','like', '%'+informacao+'%').andWhere('tipo',1);//RESULTA O SER PESQUISADO
        
        return response.json(usuario);
    },

    //Rota de update de usuários (edição de perfil)
    async edit(request,response) {//como fazer ele alterar só o que foi passado??
        const tipo = request.headers.tipo;//TIPO DO USUÁRIO
        if(tipo == 1){

        }else if(tipo == 2 || tipo == 5 || tipo ==6){

        }else{
            return response.status(400).send();
        }
    }
}

