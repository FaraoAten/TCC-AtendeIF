const connection = require('../database/connection');

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
    }
}