// Tive q add a lib multer pra fazer isso, pq o express ñ lida com formatos multipartform
const connection = require('../database/connection');

const path = require('path'); //usados para não dar erro na sintaxe do S.O.

module.exports = { 
    //rota de upload de arquivo
    async create(request, response){
        const filename = request.file.filename;
        const tipo = request.body.tipo;
        const id_usuario = request.body.id_usuario;
        const url = path.resolve(__dirname,'..','..','uploads', filename) ;
            await connection('urls').insert({
                url:url,
                tipo,
                id_usuario
            })

            return response.status(204).send(); 
    },

     //Rota de listagem de arquivo
     async index(request,response) {
        const arquivo = await connection('urls').select('url').where('tipo', 2);

        return response.json(arquivo);
    },

    //Rota de delete de arquivo
    async delete(request,response){
        const {id_urls} = request.body;
        await connection('urls').where('id_urls',id_urls).del();
        return response.status(204).send();
    }
};