
exports.up = function(knex) {
    return knex.schema.createTable('atendimento', function(table){
        table.increments('id_atendimento').unsigned();
        table.date('data_atendimento').notNullable();
        table.time('horario').notNullable();
        table.string('local').notNullable();
        table.string('materia').notNullable();
        table.boolean('status_presenca');
        table.boolean('status_cancelamento').notNullable();
        table.integer('id_aluno').notNullable().unsigned();
        table.integer('id_professor').notNullable().unsigned();
        table.foreign('id_aluno').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_professor').references('id_usuario').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('atendimento');
  };
