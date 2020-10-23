
exports.up = function(knex) {
    return knex.schema.createTable('recebe', function(table){
        table.increments('id_recebe').unsigned();
        table.integer('id_usuario').notNullable().unsigned();
        table.integer('id_mensagem').notNullable().unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');//DA PROXIMA VEZ QUE FALAR COM O WILLIAM VERIFICAR SE O ONDELETE AQUI NÃO VIA DAR RUIM
        table.foreign('id_mensagem').references('id_mensagem').inTable('mensagem').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('recebe');
};
