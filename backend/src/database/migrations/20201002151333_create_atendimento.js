//arquivo de criação da tabela atendimento no banco

exports.up = function(knex) {
    return knex.schema.createTable('atendimento', function(table){
        table.increments('id_atendimento').unsigned();
        table.date('data_atendimento').notNullable();
        table.time('horario').notNullable();
        table.string('local').notNullable();
        table.string('materia').notNullable();
        table.specificType('status_cancelamento', 'TINYINT(1)').notNullable();
        table.string('id_aluno').notNullable();
        table.string('id_professor').notNullable();
        table.foreign('id_aluno').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_professor').references('id_usuario').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('atendimento');
  };
