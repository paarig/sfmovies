'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.find = (params) => {
  const qb = new Movie().query();
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
  if (params.orderBy && params.order) {
    qb.orderBy(params.orderBy, params.order);
  } else if (params.orderBy) {
    qb.orderBy(params.orderBy);
  } else if (params.order) {
    qb.orderBy('id', params.order);
  }
  return qb;
};
