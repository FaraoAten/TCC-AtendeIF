
exports.up = function(knex) {
  return knex.schema.createTable('usuario', function(table){
      table.string('id_usuario').primary().notNullable().unique();
      table.string('num_matricula').notNullable().unique();
      table.string('senha').notNullable();
      table.string('nome').notNullable();
      table.specificType('tipo', 'TINYINT(1)').notNullable();
      table.boolean('primeiro_login').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};

