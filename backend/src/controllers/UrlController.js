// Tive q add a lib multer pra fazer isso, pq o express ñ lida com formatos multipartform
const connection = require('../database/connection');

module.exports = {
    //rota de upload de arquivo
    async create(request, response){
        const {filename} = request.file;
        const id_usuario = request.headers.authorization;

        /*const user = await connection('usuario').findById(id_usuario);

        if (!connection){
            return response.status(400).json({erro: 'Usuário inexistente'})
        }else{*/

            await connection('urls').insert({
                url:filename,
                id_usuario
            })

            return response.status(204).send(); 
        //}
    },

     //Rota de listagem de arquivo
     async index(request,response) {
        const arquivo = await connection('urls').select('*');
        
        return response.json(arquivo);
    },

    //Rota de delete de arquivo
    async delete(request,response){
        const {id_url} = request.params;
        await connection('urls').where('id_url',id_url).delete();
        return response.status(204).send();
    }
};