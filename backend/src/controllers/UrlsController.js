// Tive q add a lib multer pra fazer isso, pq o express ñ lida com formatos multipartform
const connection = require('../database/connection');

module.exports = { //problema salva, mas ñ manda pro banco, nome não tá setando
    //rota de upload de arquivo
    async create(request, response){
        const filename = request.file.filename;
        const id_usuario = request.headers.authorization;

            await connection('documentos').insert({
                url:filename,
                id_usuario
            })

            return response.status(204).send(); 
    },

     //Rota de listagem de arquivo
     async index(request,response) {
        const arquivo = await connection('urls').select('*');

        return response.json(arquivo);
    },

    //Rota de delete de arquivo
    async delete(request,response){
        const {id_urls} = request.body;
        await connection('urls').where('id_urls',id_urls).del();
        return response.status(204).send();
    }
};