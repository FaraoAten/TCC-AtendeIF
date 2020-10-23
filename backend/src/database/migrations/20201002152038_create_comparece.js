
exports.up = function(knex) {
    return knex.schema.createTable('comparece', function(table){
        table.increments('id_comparece').unsigned();
        table.integer('id_usuario').notNullable().unsigned();
        table.integer('id_atendimento').notNullable().unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');//DA PROXIMA VEZ QUE FALAR COM O WILLIAM VERIFICAR SE O ONDELETE AQUI NÃO VIA DAR RUIM
        table.foreign('id_atendimento').references('id_atendimento').inTable('atendimento').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comparece');
};
