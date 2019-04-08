'use strict';

exports.up = async (Knex) => {
  await Knex.schema.createTable('locations_movies', (table) => {
    table.integer('movie_id').unsigned().references('movies.id');
    table.integer('location_id').unsigned().references('locations.id');
  });
};

exports.down = async (Knex) =>  {
  await Knex.schema.dropTable('locations_movies');
};
