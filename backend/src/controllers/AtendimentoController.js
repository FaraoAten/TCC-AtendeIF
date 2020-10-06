const connection = require('../database/connection');

module.exports = {
    //Rota de postagem de atendimento
    async create(request, response){
        const {data_atendimento, horario, local, materia} = request.body; 
        const id_usuario = request.headers.authorization;
        let status_presenca = false;//tenho 60% de certeza de que está errado.
        let status_cancelamento = false;//tenho 60% de certeza de que está errado.

        await connection('atendimento').insert({
            data_atendimento,
            horario, 
            local, 
            materia, 
            status_presenca,
            status_cancelamento,
            id_usuario
        })

        return response.json({titulo,data,corpo,id_usuario,id_atendimento}); //essa resposta só para testes.
        },

    
    //provalmente esse daqui vai ter ser criado 2 versões por causa das visualizações do calendário do aluno feitas pelo professor e pela pedagogia.
    //Rota de listagem de atendimentos, será modificada dps.
    async index(request,response) {
        const atendimento = await connection('atendimento').select('*');
        
        return response.json(atendimento);
    }
}