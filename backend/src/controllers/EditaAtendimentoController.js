const connection = require('../database/connection');

module.exports = {
    //Rota de update de atendimento (adiar atendimento)
    async edit(request,response){
        const id_atendimento = request.headers.id_atendimento;
        const {data_atendimento, horario, local} = request.body;
        const adiar = await connection('atendimento').where('id_atendimento', id_atendimento).update({data_atendimento:data_atendimento,horario:horario,local:local})
        return response.status(204).send();
    }
}