const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = {
    //Rota de registro do usuário
    async create(request, response){
        const {num_matricula, password, nome, tipo} = request.body;
            if(num_matricula != null && num_matricula != ""){
                const matricula = await connection('usuario').select('num_matricula').where('num_matricula', num_matricula);
                if(matricula.length == 0){
                    const id_usuario = crypto.randomBytes(4).toString('HEX');
                    
                    const salt = bcrypt.genSaltSync(10);
                    const senha = bcrypt.hashSync(password, salt);
                    
                    await connection('usuario').insert({
                        id_usuario,
                        num_matricula,
                        senha, 
                        nome, 
                        tipo
                    });
                    return response.status(204).send();
                }else{
                    return response.status(400).send();
                }
            }
        },
    
    //Rota de listagem de usuários (usada na pt de pesquisa de usuário).
    async index(request,response) {
        const {informacao} = request.params; //PEGA O QUE FOI DIGITADO NA BARRA DE PESQUISA
        const usuario = await connection('usuario').select('id_usuario', 'num_matricula', 'nome').where('num_matricula', 'like', '%'+informacao+'%').andWhere('tipo',1).orWhere('nome','like', '%'+informacao+'%').andWhere('tipo',1);//RESULTA O SER PESQUISADO
        if(usuario.length>0){
            return response.json(usuario);
        }else{
            return response.status(404).send();
        }
    },

        //Rota de update de usuários (edição de perfil)
        async edit(request,response) {
            const {id_usuario, num_matricula, senha, nome, tipo} = request.body;
            
                if(num_matricula != null && num_matricula != ""){
                    const matricula = await connection('usuario').select('num_matricula').where('num_matricula', num_matricula);
                    if(matricula.length == 0){
                        const editar = await connection('usuario').where('id_usuario', id_usuario).update({num_matricula:num_matricula});
                    }else{
                        return response.status(400).send();
                    }
                }
                if(senha != null && senha != ""){
                    const editar = await connection('usuario').where('id_usuario', id_usuario).update({senha:senha});
                }
                if(nome != null && nome != ""){
                    const editar = await connection('usuario').where('id_usuario', id_usuario).update({nome:nome});
                }  
                if(tipo != null && tipo != ""){
                    const editar = await connection('usuario').where('id_usuario', id_usuario).update({tipo:tipo});
                }
                return response.status(204).send();
        },

        async login(request,response) {
            const{num_matricula, senha} = request.body;

            const matricula = await connection('usuario').select('num_matricula').where('num_matricula', num_matricula);
            if(matricula.length > 0){
                const password = await connection('usuario').select('senha').where('num_matricula', num_matricula).first();
                if(bcrypt.compareSync(senha, password.senha)){
                    const user = await connection('usuario').select('id_usuario', 'tipo').where('num_matricula', num_matricula).first();
                    return response.json(user);
                }else{
                    return response.status(400).send(); 
                }
            }else{
                return response.status(405).send(); 
            }   
        }
}

