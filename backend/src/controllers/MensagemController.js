const connection = require('../database/connection');


module.exports = {
    //Rota de registro de mensagem
    async create(request, response){
        const {titulo, corpo, id_atendimento, destinatarios, tipo_mensagens} = request.body;
        const tipo = request.headers.tipo;//TIPO DO USUÁRIO
        const id_usuario = request.headers.id_usuario;

        //TIPO DAS MENSAGENS
        if(tipo == 2){// tipo do usuario (professor)
            tipo_mensagens = 1;//parecer avaliativo
            if(id_aluno == null && id_atendimento == null){//ISSO EVITA QUE ESTEJA FALTANDO UM DESSES DADOS PARA O ENVIO DA MENSAGEM
                return response.status(400).send();
            }
        }else if(tipo == 4){// tipo do usuario (DEPEN/Apoio) 
            tipo_mensagens = 2;//mensagem institucional
        }else if(tipo==null){
            tipo_mensagens = 3;//mensagem do sistema
        }else{
            return response.status(400).send();
        }

        const id_mensagem = await connection('mensagem').returning('id_mensagem').insert({
            titulo,
            corpo,
            tipo_mensagens,
            id_remetente:tipo_mensagens != 3? id_usuario:null,
            id_atendimento:tipo_mensagens == 1? id_atendimento:null
        })

        for(var destinatario of destinarios){
            await connection('recebe').insert({
                id_usuario:destinatario,
                id_mensagem
            })
        }

        return response.status(204).send(); 
        },
    
    //Rota de listagem de mensagens
    async index(request,response) {
        const id_usuario = request.headers.id_usuario;
        let mensagem = [];
            
        mensagem = await connection('mensagem').select('*').innerJoin('recebe', 'recebe.id_mensagem', '=', 'mensagem.id_mensagem').where('id_aluno', id_usuario);

        mensagem.push(await connection('mensagem').select('*').where('tipo_mensagens', 2));
        mensagem.push(await connection('mensagem').select('*').where('id_rementente', id_usuario));

        return response.json(mensagem);
    }
}