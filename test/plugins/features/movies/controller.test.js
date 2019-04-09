'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

const Movie = require('../../../../lib/models/movie');

const Knex = require('../../../../lib/libraries/knex');

describe('movie controller', () => {

  const firstMovie = {
    name: 'test movie 1',
    release_year: 1985
  };

  const secondMovie = {
    name: 'test movie 2',
    release_year: 1990
  };

  beforeEach('Setting up the test DB', async () => {
    await Knex.raw('TRUNCATE TABLE movies, locations, locations_movies CASCADE');
    await new Movie().save(firstMovie);
    await new Movie().save(secondMovie);
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'Forrest Gump' };

      const movie = await Controller.createMovie(payload);

      expect(movie.get('name')).to.eql(payload.name);
    });

    it('creates a new location', async () => {
      const payload = { name: 'test location' };

      const movieId = await new Movie({ name: firstMovie.name }).fetch().get('id');

      const movie = await Controller.createLocation(payload, movieId);

      expect(movie.get('name')).to.eql(firstMovie.name);
      expect(movie.related('locations').length).to.eql(1);
      expect(movie.related('locations').at(0).get('name')).to.eql('test location');
    });

    it('attaches old location to new movie', async () => {
      const payload = { name: 'test location' };

      const firstId = await new Movie({ name: firstMovie.name }).fetch().get('id');
      await Controller.createLocation(payload, firstId);
      const secondId = await new Movie({ name: secondMovie.name }).fetch().get('id');
      const movie = await Controller.createLocation(payload, secondId);

      expect(movie.get('name')).to.eql(secondMovie.name);
      expect(movie.related('locations').length).to.eql(1);
      expect(movie.related('locations').at(0).get('name')).to.eql('test location');
    });

  });

  describe('find', () => {

    it('finds a movie w/o params', async () => {
      const movies = await Controller.find();
      expect(movies.length).to.eql(2);
      expect(movies.at(0).get('name')).to.eql(firstMovie.name);
      expect(movies.at(0).get('release_year')).to.eql(firstMovie.release_year);
      expect(movies.at(1).get('name')).to.eql(secondMovie.name);
      expect(movies.at(1).get('release_year')).to.eql(secondMovie.release_year);
    });

    it('finds a movie with order param', async () => {
      const params = {
        title: secondMovie.name,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order: 'asc'
      };

      const movies = await Controller.find(params);
      expect(movies.length).to.eql(1);
      expect(movies.at(0).get('name')).to.eql(secondMovie.name);
      expect(movies.at(0).get('release_year')).to.eql(secondMovie.release_year);
    });

    it('finds a movie with order & order_by params', async () => {
      const params = {
        title: secondMovie.name,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order: 'desc',
        order_by: 'name'
      };

      const movies = await Controller.find(params);

      expect(movies.length).to.eql(1);
      expect(movies.at(0).get('name')).to.eql(secondMovie.name);
      expect(movies.at(0).get('release_year')).to.eql(secondMovie.release_year);
    });

    it('finds a movie with order_by param', async () => {
      const params = {
        title: secondMovie.name,
        year: secondMovie.release_year,
        start_yr: firstMovie.release_year,
        end_yr: 1995,
        order_by: 'year'
      };

      const movies = await Controller.find(params);

      expect(movies.length).to.eql(1);
      expect(movies.at(0).get('name')).to.eql(secondMovie.name);
      expect(movies.at(0).get('release_year')).to.eql(secondMovie.release_year);
    });

  });

});
