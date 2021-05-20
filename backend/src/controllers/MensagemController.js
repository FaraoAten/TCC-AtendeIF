//arquivo de manipulação da tabela Mensagem

const connection = require('../database/connection');


module.exports = {
    async listarMensagem(request, response) {
        const authorization = request.headers.authorization;

        var atual = new Date();
        var atualData = atual.getFullYear()+"-"+(atual.getMonth() + 1)+"-"+atual.getDate();

        const mensagem = await connection('mensagem').join('atendimento', 'mensagem.id_atendimento', '=', 'atendimento.id_atendimento').select('mensagem.titulo','mensagem.corpo').where('id_destinatario', authorization).andWhere('atendimento.data_atendimento', '>=', atualData).orderBy('data', 'desc');
        if(mensagem.length > 0){
            return response.json(mensagem);
        }else{
            return response.status(404).send();
        }
    },

    async cadastrarMensagem(request, response) {
        const {titulo, corpo, id_remetente, id_destinatario, id_atendimento} = request.body;

        await connection('mensagem').insert({
            titulo,
            corpo,
            id_remetente,
            id_destinatario,
            id_atendimento
        })

        return response.status(204).send();
    }
}