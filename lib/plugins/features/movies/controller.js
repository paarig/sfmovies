'use strict';

const Movie = require('../../../models/movie');

const Location = require('../../../models/location');

exports.createMovie = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.createLocation = async (payload, movieId) => {
  let location = await new Location({ name: payload.name }).fetch();
  if (!location) {
    location = await new Location().save(payload);
  }
  await new Movie({ id: movieId }).locations().attach(location);
  return new Movie({ id: movieId }).fetch({ withRelated: ['locations'] });
};

exports.find = async (params) => {
  const movie = await new Movie()
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
  .fetchAll({ withRelated: ['locations'] });
  return movie;
};
