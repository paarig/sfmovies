'use strict';

const Movie = require('../../../models/movie');

const Location = require('../../../models/location');

const MOVIE_FETCH_OPTIONS = {
  withRelated: ['locations']
}

exports.createMovie = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch(MOVIE_FETCH_OPTIONS);
};

exports.createLocation = async (payload, movieId) => {
  let location = await new Location({ name: payload.name }).fetch();
  if (!location) {
    location = await new Location().save(payload);
  }
  await new Movie({ id: movieId }).locations().attach(location);
  return new Movie({ id: movieId }).fetch(MOVIE_FETCH_OPTIONS);
};

exports.find = async (params) => {
  return new Movie()
  .query((qb) => {
    if (params) {
      if (params.year) {
        qb.where('release_year', '=', params.year);
      }
      if (params.start_yr) {
        qb.where('release_year', '>=', params.start_yr);
      }
      if (params.end_yr) {
        qb.where('release_year', '<=', params.end_yr);
      }
      if (params.title) {
        qb.where('title', '=', params.title);
      }
      if (params.order_by === 'year') {
        params.order_by = 'release_year';
      }
      if (params.order_by && params.order) {
        qb.orderBy(params.order_by, params.order);
      } else if (params.order_by) {
        qb.orderBy(params.order_by);
      } else if (params.order) {
        qb.orderBy('id', params.order);
      }
    }
  })
  .fetchAll(MOVIE_FETCH_OPTIONS);
};
