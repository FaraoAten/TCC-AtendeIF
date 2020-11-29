// Tive q add a lib multer pra fazer isso, pq o express ñ lida com formatos multipartform
const connection = require('../database/connection');

module.exports = {
    //rota de upload de arquivo
    async create(request, response){
        const {filename} = require.file;
        const {tipo_arquivo} = request.body;
        const id_usuario = request.headers.authorization;

        await connection('urls').insert({
            url:filename,
            tipo_arquivo,
            id_usuario
        })

        return response.json({url, tipo_arquivo, id_usuario}); //essa resposta só para testes.
        },

     //Rota de listagem de arquivo
     async index(request,response) {
        const id_usuario = request.headers.authorization;
        const arquivo = await connection('urls').select('*');
        
        return response.json(arquivo);
    }
};