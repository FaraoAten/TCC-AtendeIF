
exports.up = function(knex) {
    return knex.schema.createTable('urls', function(table){
        table.increments('id_url').unsigned();
        table.string('url').notNullable();
        table.string('id_usuario').notNullable();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario').onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('urls');
  }; 