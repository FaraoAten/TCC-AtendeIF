
exports.up = function(knex) {
    return knex.schema.createTable('mensagem', function(table){
        table.increments('id_mensagem').unsigned();
        table.string('titulo').notNullable();
        table.date('data').defaultTo(knex.raw('CURRENT_DATE')).notNullable();
        table.string('corpo').notNullable();
        table.specificType('interagida', 'TINYINT(1)').notNullable();
        table.string('id_remetente').notNullable();
        table.string('id_destinatario').notNullable();
        table.integer('id_atendimento').unsigned();
        table.foreign('id_remetente').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_destinatario').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
        table.foreign('id_atendimento').references('id_atendimento').inTable('atendimento').onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('mensagem');
  };
