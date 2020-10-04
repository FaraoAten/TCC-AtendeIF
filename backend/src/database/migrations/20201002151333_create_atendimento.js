
exports.up = function(knex) {
    return knex.schema.createTable('atendimento', function(table){
        table.increments('id_atendimento').unsigned();
        table.date('data_atendimento').notNullable();
        table.time('horario').notNullable();
        table.string('local').notNullable();
        table.string('materia').notNullable();
        table.boolean('status_presenca').notNullable();
        table.boolean('status_cancelamento').notNullable();
        table.integer('id_usuario').notNullable().unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('atendimento');
  };
