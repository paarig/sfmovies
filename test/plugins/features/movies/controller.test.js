'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

const Movie = require('../../../../lib/models/movie');

describe('movie controller', () => {

  const firstMovie = {
    title: 'test movie 1',
    release_year: 1985
  };

  const secondMovie = {
    title: 'test movie 2',
    release_year: 1990
  };

  before('Setting up the test DB', async () => {
    await new Movie().query().del();

    Controller.create(firstMovie);
    Controller.create(secondMovie);
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'Forrest Gump' };

      const movie = await Controller.create(payload);

      expect(movie.get('title')).to.eql(payload.title);
      await new Movie().query().where('title', 'Forrest Gump').del();
    });

  });

  describe('find', () => {

    it('finds a movie', async () => {
      const movies = await Controller.find();
      expect(movies.length).to.eql(2);
      expect(movies[0].title).to.eql(firstMovie.title);
      expect(movies[0].release_year).to.eql(firstMovie.release_year);
      expect(movies[1].title).to.eql(secondMovie.title);
      expect(movies[1].release_year).to.eql(secondMovie.release_year);
    });

    it('finds a movie with query params (order)', async () => {
      const params = {
        title: secondMovie.title,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order: 'asc'
      };

      const movies = await Controller.find(params);

      expect(movies.length).to.eql(1);
      expect(movies[0].title).to.eql(secondMovie.title);
      expect(movies[0].release_year).to.eql(secondMovie.release_year);
    });

    it('finds a movie with query params (order & orderBy)', async () => {
      const params = {
        title: secondMovie.title,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order: 'desc',
        orderBy: 'title'
      };

      const movies = await Controller.find(params);

      expect(movies.length).to.eql(1);
      expect(movies[0].title).to.eql(secondMovie.title);
      expect(movies[0].release_year).to.eql(secondMovie.release_year);
    });

    it('finds a movie with query params (orderBy)', async () => {
      const params = {
        title: secondMovie.title,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        orderBy: 'year'
      };

      const movies = await Controller.find(params);

      expect(movies[0].title).to.eql(secondMovie.title);
      expect(movies[0].release_year).to.eql(secondMovie.release_year);
      expect(movies.length).to.eql(1);
    });

  });

});
