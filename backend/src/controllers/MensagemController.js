const connection = require('../database/connection');


module.exports = {
    //Rota de registro de mensagem
    async create(request, response) {
        const { titulo, corpo, id_atendimento, destinatarios } = request.body;
        //const tipo = request.headers.tipo;//TIPO DO USUÁRIO
        const id_usuario = request.headers.id_usuario;

        const id_mensagem = await connection('mensagem').returning('id_mensagem').insert({
            titulo,
            corpo,
            id_remetente,
            id_atendimento
        })

        for (var destinatario of destinatarios) {
            await connection('recebe').insert({
                id_usuario: destinatario,
                id_mensagem
            })
        }

        return response.status(204).send();
    },

    //Rota de listagem de mensagens
    async index(request, response) {
        const id_usuario = request.headers.id_usuario;
        let mensagem = [];

        mensagem = await connection('mensagem').select('mensagem.*', 'recebe.id_usuario').leftJoin('recebe', 'recebe.id_mensagem', '=', 'mensagem.id_mensagem').where('id_usuario', id_usuario).orWhere('id_remetente', id_usuario).orderBy(["data", "id_mensagem"]);

        return response.json(mensagem);
    }
}