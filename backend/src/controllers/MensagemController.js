const connection = require('../database/connection');


module.exports = {
    //Rota de registro de mensagem
    async create(request, response){
        const {titulo, corpo, id_aluno, id_atendimento} = request.body;
        const tipo = request.headers.tipo;//TIPO DO USUÁRIO
        const id_usuario = request.headers.id_usuario;

        //TIPO DAS MENSAGENS
        if(tipo == 2){// tipo do usuario (professor)
            const tipo_mensagens = 1;//parecer avaliativo
            if(id_aluno == null && id_atendimento == null){//ISSO EVITA QUE ESTEJA FALTANDO UM DESSES DADOS PARA O ENVIO DA MENSAGEM
                return response.status(400).send();
            }
        }else if(tipo == 4){// tipo do usuario (DEPEN/Apoio) 
            const tipo_mensagens = 2;//mensagem institucional
        }else{
            return response.status(400).send();
        }

        await connection('mensagem').insert({
            titulo,
            corpo,
            tipo_mensagens, 
            id_aluno,
            id_professor:tipo==2?id_usuario:null,//ESSES 2 DIZEM QUE SE O TIPO DO USUÁRIO LOGADO FOR O DELES O ID DO USUÁRIO LOGADO DEVE SER SALVO NELE NO BANCO, CASO NÃO ELE DEVE SER NULO
            id_ifsul:tipo==4?id_usuario:null,
            id_atendimento
        })

        return response.json({titulo, corpo, id_aluno, id_atendimento}); //essa resposta só para testes.
        },
    
    //Rota de listagem de mensagens
    async index(request,response) {
        const id_usuario = request.headers.id_usuario;
        let mensagem = [];
            
        mensagem = await connection('mensagem').select('*').where('id_aluno', id_usuario);

        mensagem.push(await connection('mensagem').select('*').where('tipo_mensagens', 2));
        
        return response.json(mensagem);
    }
}