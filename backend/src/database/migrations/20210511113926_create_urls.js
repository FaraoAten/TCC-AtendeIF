
exports.up = function(knex) {
    return knex.schema.createTable('urls', function(table){
        table.increments('id_urls').unsigned();
        table.string('url').notNullable();
        table.string('nome_arquivo').notNullable();
        table.specificType('tipo', 'TINYINT(1)').notNullable();
        table.string('id_usuario');
        table.foreign('id_usuario').references('id_usuario').inTable('usuario').onUpdate('CASCADE').onDelete('CASCADE');
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('urls');
  };

