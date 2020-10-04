
exports.up = function(knex) {
    return knex.schema.createTable('comparece', function(table){
        table.increments('id_comparece').unsigned();
        table.integer('id_usuario').notNullable().unsigned();
        table.integer('id_atendimento').notNullable().unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario');
        table.foreign('id_atendimento').references('id_atendimento').inTable('atendimento');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comparece');
};
