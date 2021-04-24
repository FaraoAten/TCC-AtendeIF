const connection = require('../database/connection');

module.exports = {
    //Rota de postagem de atendimento
    async create(request, response){
        const {data_atendimento, horario, local, materia, id_aluno, id_professor} = request.body;

        await connection('atendimento').insert({
            data_atendimento,
            horario, 
            local, 
            materia,
            status_cancelamento:false,
            id_aluno,
            id_professor
        })

        return response.status(204).send(); 
        },

    //Rota de listagem de atendimentos de professor. 
    async listaAtendimentoProf(request,response) {
        const id_usuario = request.headers.authorization;
        var atual = new Date();
        var atualData = atual.getFullYear()+"-"+(atual.getMonth() + 1)+"-"+atual.getDate();
        const atendimento = await connection('atendimento').join('usuario', 'atendimento.id_aluno', '=', 'usuario.id_usuario').select('atendimento.id_atendimento', 'atendimento.data_atendimento', 'atendimento.horario', 'atendimento.local', 'atendimento.materia', 'usuario.num_matricula', 'usuario.nome').where('atendimento.id_professor', id_usuario).andWhereNot('atendimento.status_cancelamento', 1).andWhere('atendimento.data_atendimento', '>=', atualData);
        
        if(atendimento.length>0){
            var resultado={};
            for (let i = 0; i < atendimento.length; i++) {
                const element = atendimento[i];
                var atendimentoUnico = {
                    id:element.id_atendimento,
                    horario:element.horario, 
                    local:element.local, 
                    materia:element.materia, 
                    matricula:element.num_matricula, 
                    nome:element.nome
                }
                var data = element.data_atendimento;
                let dataFormatada;
                if((data.getMonth() + 1) < 10){
                    dataFormatada = ((data.getDate() )) + "/0" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                }else{
                    dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                }

                if(resultado[dataFormatada] == undefined || resultado[dataFormatada] == null){
                    resultado[dataFormatada] = [];
                }
                resultado[dataFormatada].push(atendimentoUnico); 
            }

            return response.json(resultado);
        }else{
            return response.status(404).send();
        }
    },

    //Rota de listagem de atendimentos de estudante(professor view).
    async listaAtendimentoEstuProf(request,response) {
        const id_usuario = request.headers.id_usuario;
        var atual = new Date();
        var atualData = atual.getFullYear()+"-"+(atual.getMonth() + 1)+"-"+atual.getDate();
        const atendimento = await connection('atendimento').join('usuario', 'atendimento.id_professor', '=', 'usuario.id_usuario').select('atendimento.data_atendimento', 'atendimento.horario', 'atendimento.local', 'atendimento.materia', 'usuario.nome').where('atendimento.id_aluno', id_usuario).andWhereNot('atendimento.status_cancelamento', 1).andWhere('atendimento.data_atendimento', '>=', atualData);
        
        if(atendimento.length > 0){
            var resultado={};
            for (let i = 0; i < atendimento.length; i++) {
                const element = atendimento[i];
                var atendimentoUnico = {
                    horario:element.horario, 
                    local:element.local, 
                    materia:element.materia,
                    nome:element.nome
                }
                var data = element.data_atendimento;
                let dataFormatada;
                if((data.getMonth() + 1) < 10){
                    dataFormatada = ((data.getDate() )) + "/0" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                }else{
                    dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                }
    
                if(resultado[dataFormatada] == undefined || resultado[dataFormatada] == null){
                    resultado[dataFormatada] = [];
                }
                resultado[dataFormatada].push(atendimentoUnico); 
            }
    
            return response.json(resultado);
        }else{
            return response.status(404).send();
        }
    },

    //Rota de listagem de atendimentos de estudante.
    async listaAtendimentoEstu(request,response) {
        const id_usuario = request.headers.authorization;
        const atendimento = await connection('atendimento').select('*').where('id_aluno', id_usuario).orWhere('id_professor', id_usuario);
        return response.json(atendimento);
    },

    //Rota de update de atendimento (adiar atendimento)
    async edit(request,response){
        const {id_atendimento, data_atendimento, horario, local} = request.body;
        if(data_atendimento!=null && data_atendimento!=""){
            const adiar = await connection('atendimento').where('id_atendimento', id_atendimento).update({data_atendimento:data_atendimento});
        }
        if(horario!=null && horario!=""){
            const adiar = await connection('atendimento').where('id_atendimento', id_atendimento).update({horario:horario});
        }
        if(local!=null && local!=""){
            const adiar = await connection('atendimento').where('id_atendimento', id_atendimento).update({local:local});
        }
        return response.status(204).send();
    }
}