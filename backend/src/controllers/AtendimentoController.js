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
            status_presenca:false,
            status_cancelamento:false,
            id_aluno,//O DO ALUNO PUXAMOS DO RESULTADO DA PESQUISA ATRAVÉS DO FRONT
            id_professor
        })

        return response.json({titulo,data,corpo,id_professor}); //essa resposta só para testes.
        },

    //Rota de listagem de atendimentos.
    async index(request,response) {
        const tipo = request.headers.tipo;//TIPO DO USUÁRIO
        const id_usuario = request.headers.id_usuario;//ID DE QUEM TÁ LOGADO
        if(tipo == 1){
            const atendimento = await connection('atendimento').select('*').where('id_aluno', id_usuario);//NO CASO DO PROFESSOR QUERER VER OS ATENDIMENTOS DOS ALUNOS VAI SER CHAMADO ESSE MÉTODO TAMBÉM, ATRAVÉS DO FRONT.
        }else{
            const atendimento = await connection('atendimento').select('*').where('id_professor', id_usuario);
        }
        
        
        return response.json(atendimento);
    }
}