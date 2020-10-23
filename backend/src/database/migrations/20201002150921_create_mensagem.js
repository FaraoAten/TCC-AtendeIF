
exports.up = function(knex) {
    return knex.schema.createTable('mensagem', function(table){
        table.increments('id_mensagem').unsigned();
        table.string('titulo').notNullable();
        table.date('data').defaultTo(knex.raw('CURRENT_DATE')).notNullable();
        table.string('corpo').notNullable();
        table.integer('tipo_mensagens').notNullable();
        table.integer('id_aluno').unsigned();
        table.integer('id_professor').unsigned();
        table.integer('id_ifsul').unsigned();
        table.integer('id_atendimento').unsigned();
        table.foreign('id_aluno').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_professor').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_ifsul').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_atendimento').references('id_atendimento').inTable('atendimento').onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('mensagem');
  };
