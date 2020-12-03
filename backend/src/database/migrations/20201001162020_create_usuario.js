
exports.up = function(knex) {
  return knex.schema.createTable('usuario', function(table){
      table.string('id_usuario').primary().notNullable().unique();
      table.string('num_matricula').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('senha').notNullable();
      table.string('nome').notNullable();
      table.integer('tipo',1).notNullable();
      table.decimal('frequencia').unsigned();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};

