'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

const Movie = require('../../../../lib/models/movie');

const Knex = require('../../../../lib/libraries/knex');

describe('movie controller', () => {

  const firstMovie = {
    title: 'test movie 1',
    release_year: 1985
  };

  const secondMovie = {
    title: 'test movie 2',
    release_year: 1990
  };

  beforeEach('Setting up the test DB', async () => {
    await Knex.raw('TRUNCATE movies CASCADE');
    await new Movie().save(firstMovie);
    await new Movie().save(secondMovie);
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'Forrest Gump' };

      const movie = await Controller.create(payload);

      expect(movie.get('title')).to.eql(payload.title);
    });

  });

  describe('find', () => {

    it('finds a movie w/o params', async () => {
      const movies = await Controller.find().get('models');
      expect(movies.length).to.eql(2);
      expect(movies[0].get('title')).to.eql(firstMovie.title);
      expect(movies[0].get('release_year')).to.eql(firstMovie.release_year);
      expect(movies[1].get('title')).to.eql(secondMovie.title);
      expect(movies[1].get('release_year')).to.eql(secondMovie.release_year);
    });

    it('finds a movie with order param', async () => {
      const params = {
        title: secondMovie.title,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order: 'asc'
      };

      const movies = await Controller.find(params).get('models');
      expect(movies.length).to.eql(1);
      expect(movies[0].get('title')).to.eql(secondMovie.title);
      expect(movies[0].get('release_year')).to.eql(secondMovie.release_year);
    });

    it('finds a movie with order & order_by params', async () => {
      const params = {
        title: secondMovie.title,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order: 'desc',
        order_by: 'title'
      };

      const movies = await Controller.find(params).get('models');

      expect(movies.length).to.eql(1);
      expect(movies[0].get('title')).to.eql(secondMovie.title);
      expect(movies[0].get('release_year')).to.eql(secondMovie.release_year);
    });

    it('finds a movie with order_by param', async () => {
      const params = {
        title: secondMovie.title,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order_by: 'year'
      };

      const movies = await Controller.find(params).get('models');

      expect(movies[0].get('title')).to.eql(secondMovie.title);
      expect(movies[0].get('release_year')).to.eql(secondMovie.release_year);
      expect(movies.length).to.eql(1);
    });

  });

});
