'use strict';

exports.up = async (Knex) => {
  await Knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.text('title').notNullable();
    table.integer('release_year');
  }).createTable('locations', (table) => {
    table.increments('id').primary();
    table.string('name');
  }).createTable('locations_movies', (table) => {
    table.integer('movie_id').unsigned().references('movies.id');
    table.integer('location_id').unsigned().references('locations.id');
  });
};

exports.down = async (Knex) =>  {
  await Knex.schema.dropTable('movies')
  .dropTable('locations')
  .dropTable('locations_movies');
};
