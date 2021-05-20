//arquivo de manipulação da tabela Urls

const connection = require('../database/connection');

const path = require('path');

var fs = require('fs')

module.exports = { 
     async listarUrls(request,response) {

        const arquivo = await connection('urls').select('id_urls', 'url', 'nome_arquivo').where('tipo', 2);

        if(arquivo.length>0){
            return response.json(arquivo);
        }else{
            return response.status(404).send();
        }
    },

    async verificarFotoCadastrada(request,response) {

        const id_usuario = request.headers.authorization;
        const id_urls = await connection('urls').select('id_urls').where('id_usuario', id_usuario);

        if(id_urls.length>0){
            return response.json(id_urls);
        }else{
            return response.status(404).send();
        } 
    },

    async cadastrarUrls(request, response){

        const filename = request.file.filename;
        const tipo = request.body.tipo;
        const id_usuario = request.body.id_usuario;
        const url = path.resolve(__dirname,'..','..','uploads', filename);

            await connection('urls').insert({
                url:url,
                nome_arquivo:filename,
                tipo,
                id_usuario
            })

            return response.status(204).send(); 
    },

    async deletarUrls(request,response){

        const {id_urls} = request.body;
        const arquivo = await connection('urls').select('nome_arquivo').where('id_urls',id_urls);

        fs.unlinkSync(path.resolve(__dirname,'..','..','uploads', arquivo[0].nome_arquivo));

        await connection('urls').where('id_urls',id_urls).del();

        return response.status(204).send();
    }
};