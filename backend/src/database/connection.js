// arquivo de conexão com o banco, para permitir a manipulação das infos do BD

const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;