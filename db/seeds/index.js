'use strict';

const Movies = require('./data/movies');

const Locations = require('./data/locations');

exports.seed = async (Knex) => {
  await Knex.raw('TRUNCATE TABLE movies, locations, locations_movies CASCADE');
  await Knex('movies').insert(Movies);
  await Knex('locations').insert(Locations);
  const locationIds = await Knex('locations').select('id');
  for (let i = 0; i < locationIds.length; i++) {
    const movies = await Knex('movies').orderByRaw('RANDOM()').limit(1);
    await Knex('locations_movies').insert({ movie_id: movies[0].id, location_id: locationIds[i].id });
  }
};
