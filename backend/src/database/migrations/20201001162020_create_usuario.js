
exports.up = function(knex) {
  return knex.schema.createTable('usuario', function(table){
      table.increments('id_usuario');
      table.string('num_matricula').notNullable();
      table.string('email').notNullable();
      table.string('senha').notNullable();
      table.string('nome').notNullable();
      table.integer('tipo',1).notNullable();
      table.decimal('frequencia');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('usuario');
};
