const { response, request } = require('express');
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
        const atendimento = await connection('atendimento').join('usuario', 'atendimento.id_aluno', '=', 'usuario.id_usuario').select('atendimento.id_atendimento', 'atendimento.data_atendimento', 'atendimento.horario', 'atendimento.local', 'atendimento.materia', 'usuario.num_matricula', 'usuario.id_usuario', 'usuario.nome').where('atendimento.id_professor', id_usuario).andWhereNot('atendimento.status_cancelamento', 1).andWhere('atendimento.data_atendimento', '>=', atualData).orderBy('atendimento.data_atendimento');
        
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
                    id_usuario:element.id_usuario, 
                    nome:element.nome
                }
                var data = element.data_atendimento;
                let dataFormatada;
                if(((data.getDate() ))<10){
                    dataFormatada = "0" + ((data.getDate() ));
                }else{
                    dataFormatada = ((data.getDate() ));
                }
    
                if((data.getMonth() + 1) < 10){
                    dataFormatada += "/0" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                }else{
                    dataFormatada += "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
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
        const atendimento = await connection('atendimento').join('usuario', 'atendimento.id_professor', '=', 'usuario.id_usuario').select('atendimento.data_atendimento', 'atendimento.horario', 'atendimento.local', 'atendimento.materia', 'usuario.nome').where('atendimento.id_aluno', id_usuario).andWhereNot('atendimento.status_cancelamento', 1).andWhere('atendimento.data_atendimento', '>=', atualData).orderBy('atendimento.data_atendimento');
        
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
                if(((data.getDate() ))<10){
                    dataFormatada = "0" + ((data.getDate() ));
                }else{
                    dataFormatada = ((data.getDate() ));
                }
    
                if((data.getMonth() + 1) < 10){
                    dataFormatada += "/0" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                }else{
                    dataFormatada += "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
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
        var atual = new Date();
        var atualData = atual.getFullYear()+"-"+(atual.getMonth() + 1)+"-"+atual.getDate();
        var semana = new Date();
        semana.setDate(atual.getDate() + 6);
        var semanaData = semana.getFullYear()+"-"+(semana.getMonth() + 1)+"-"+semana.getDate();
        const atendimento = await connection('atendimento').join('usuario', 'atendimento.id_professor', '=', 'usuario.id_usuario').select('atendimento.id_atendimento', 'atendimento.data_atendimento', 'atendimento.data_atendimento', 'atendimento.horario', 'atendimento.local', 'atendimento.materia', 'atendimento.status_cancelamento', 'usuario.id_usuario', 'usuario.nome').where('atendimento.id_aluno', id_usuario).andWhereNot('atendimento.status_cancelamento', 1).andWhere('atendimento.data_atendimento', '>=', atualData).andWhere('atendimento.data_atendimento','<=', semanaData).orderBy('atendimento.data_atendimento');
        
        if(atendimento.length > 0){
            var resultado={};
            for (let i = 0; i < atendimento.length; i++) {
                const element = atendimento[i];
                var atendimentoUnico = {
                    id:element.id_atendimento,
                    horario:element.horario, 
                    local:element.local, 
                    materia:element.materia,
                    status:element.status_cancelamento,
                    id_usuario:element.id_usuario,
                    nome:element.nome
                }
                var data = element.data_atendimento;
                nomeDia = new Array ("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado");
                let dataFormatada = nomeDia[data.getDay()];
    
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
    },

    async cancelar(request,response){
        const {id_atendimento, status_cancelamento} = request.body;
        const cancela = await connection('atendimento').where('id_atendimento', id_atendimento).update({status_cancelamento:status_cancelamento});
        return response.status(204).send();
    },

    async montarMensagem(request,response){
        const id_atend = request.headers.id_atendimento;
        const mensagemMontada = await connection('atendimento').join('usuario', 'atendimento.id_aluno', '=', 'usuario.id_usuario').select('atendimento.data_atendimento','usuario.nome','usuario.num_matricula').where('atendimento.id_atendimento', id_atend);
        for (let i = 0; i < mensagemMontada.length; i++) {
            const element = mensagemMontada[i];

            var data = element.data_atendimento;
            let dataFormatada;
            
            if(((data.getDate() ))<10){
                dataFormatada = "0" + ((data.getDate() ));
            }else{
                dataFormatada = ((data.getDate() ));
            }

            if((data.getMonth() + 1) < 10){
                dataFormatada += "/0" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
            }else{
                dataFormatada += "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
            }

            var atendimentoUnico = {
                dataMsg:dataFormatada, 
                nomeMsg:element.nome, 
                matriculaMsg:element.num_matricula
            }
        }
        return response.json(atendimentoUnico);
    },

    async montarMensagemEstu(request,response){
        const id_atend = request.headers.id_atendimento;
        const mensagemMontada = await connection('atendimento').select('data_atendimento').where('id_atendimento', id_atend);
        for (let i = 0; i < mensagemMontada.length; i++) {
            const element = mensagemMontada[i];

            var data = element.data_atendimento;
            nomeDia = new Array ("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado");
            let dataFormatada = nomeDia[data.getDay()];

            var atendimentoUnico = {
                dataMsg:dataFormatada
            }
        }
        return response.json(atendimentoUnico);
    }
}
