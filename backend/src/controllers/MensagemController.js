const connection = require('../database/connection');


module.exports = {
    //Rota de registro de mensagem
    async create(request, response) {
        const {titulo, corpo, id_remetente, id_destinatario, id_atendimento} = request.body;

        await connection('mensagem').insert({
            titulo,
            corpo,
            id_remetente,
            id_destinatario,
            id_atendimento
        })

        return response.status(204).send();
    },

    //Rota de listagem de mensagens
    async index(request, response) {
        const authorization = request.headers.authorization;
        let mensagem = [];

        mensagem = await connection('mensagem').select('titulo','corpo').where('id_destinatario', authorization).orderBy("data");

        return response.json(mensagem);
    }
}