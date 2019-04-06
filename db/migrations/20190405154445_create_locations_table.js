'use strict';

exports.up = async (Knex) => {
  await Knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.string('name');
  });
};

exports.down = async (Knex) =>  {
  await Knex.schema.dropTable('locations');
};
