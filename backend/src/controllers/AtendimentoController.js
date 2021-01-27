const connection = require('../database/connection');
const { edit } = require('./UsuarioController');

module.exports = {
    //Rota de postagem de atendimento
    async create(request, response){
        const {data_atendimento, horario, local, materia, id_aluno} = request.body; 
        const id_professor = request.headers.authorization;

        await connection('atendimento').insert({
            data_atendimento,
            horario, 
            local, 
            materia, 
            status_presenca:null,
            status_cancelamento:false,
            id_aluno,//O DO ALUNO PUXAMOS DO RESULTADO DA PESQUISA ATRAVÉS DO FRONT
            id_professor
        })

        return response.status(204).send(); 
        },

    //Rota de listagem de atendimentos. 
    async index(request,response) {
        const id_usuario = request.headers.id_usuario;
        const atendimento = await connection('atendimento').select('*').where('id_aluno', id_usuario).orWhere('id_professor', id_usuario);
        return response.json(atendimento);
    },

    //Rota de update de atendimento (adiar atendimento)
    async edit(request,response){
        const id_atendimento = request.headers.id_atendimento;
        const {data_atendimento, horario, local} = request.body;
        const adiar = await connection('atendimento').where('id_atendimento', id_atendimento).update({data_atendimento:data_atendimento,horario:horario,local:local})
        return response.status(204).send();
    }
}