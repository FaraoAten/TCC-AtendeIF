const connection = require('../database/connection');

//talvez tenhamos que criar uma rota de criação e de listagem para cada tipo de mensagem (institucional, sistema e parecer)

module.exports = {
    //Rota de registro de mensagem
    async create(request, response){
        const {titulo, corpo} = request.body;
        const data = request.system.data;//não sei se é assim para pegar a data do sistema.
        const id_usuario = request.headers.authorization;
        const id_atendimento = request.headers.attendence;//tá errado, mas não faço ideia de como regatar esse valor.

        await connection('mensagem').insert({
            titulo,
            data, 
            corpo, 
            id_usuario, 
            id_atendimento
        })

        return response.json({titulo,data,corpo,id_usuario,id_atendimento}); //essa resposta só para testes.
        },
    
    //Rota de listagem de mensagens, talvez será modificada dps.
    async index(request,response) {
        const mensagem = await connection('mensagem').select('*');
        
        return response.json(mensagem);
    }
}