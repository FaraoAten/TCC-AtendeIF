//configuração do multer
const multer = require('multer');
const path = require('path'); //usados para não dar erro na sintaxe do S.O.

module.exports = {
    //como o multer vai armazenar os arquivos
    storage: multer.diskStorage({
        //pasta onde os arquivos serão salvos
        destination: path.resolve(__dirname,'..','..','uploads'),
        //como o nome do arquivo será formado
        filename: (require, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    })
};
