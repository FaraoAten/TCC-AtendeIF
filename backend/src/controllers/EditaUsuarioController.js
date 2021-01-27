const connection = require('../database/connection');

module.exports = {
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