'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

const Movie = require('../../../../lib/models/movie');

describe('movie controller', () => {

  const firstTitle = 'test movie 1';
  const firstYear = 1985;
  const secondTitle = 'test movie 2';
  const secondYear = 1990;

  before('Setting up the test DB', async () => {
    await new Movie().query().del();

    const firstPayload = {
      title: firstTitle,
      release_year: firstYear
    };

    const secondPayload = {
      title: secondTitle,
      release_year: secondYear
    };

    Controller.create(firstPayload);
    Controller.create(secondPayload);
  });

  after('Deleting the test DB', async () => {
    await new Movie().query().del();
  });

  afterEach('deletes Forrest Gump', async () => {
    await new Movie().query().where('title', 'Forrest Gump').del();
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'Forrest Gump' };

      const movie = await Controller.create(payload);

      expect(movie.get('title')).to.eql(payload.title);
    });

  });

  describe('find', () => {

    it('finds a movie', async () => {
      const movies = await Controller.find();
      expect(movies[0].title).to.eql(firstTitle);
      expect(movies[0].release_year).to.eql(firstYear);
      expect(movies[1].title).to.eql(secondTitle);
      expect(movies[1].release_year).to.eql(secondYear);
      expect(movies.length).to.eql(2);
    });

    it('finds a movie with query params (order)', async () => {
      const params = {
        title: secondTitle,
        year: secondYear,
        start_yr: firstYear,
        end_yr: 1995,
        order: 'asc'
      };

      const movies = await Controller.find(params);

      expect(movies[0].title).to.eql(secondTitle);
      expect(movies[0].release_year).to.eql(secondYear);
      expect(movies.length).to.eql(1);
    });

    it('finds a movie with query params (order & orderBy)', async () => {
      const params = {
        title: secondTitle,
        year: secondYear,
        start_yr: firstYear,
        end_yr: 1995,
        order: 'desc',
        orderBy: 'title'
      };

      const movies = await Controller.find(params);

      expect(movies[0].title).to.eql(secondTitle);
      expect(movies[0].release_year).to.eql(secondYear);
      expect(movies.length).to.eql(1);
    });

    it('finds a movie with query params (orderBy)', async () => {
      const params = {
        title: secondTitle,
        year: secondYear,
        start_yr: firstYear,
        end_yr: 1995,
        orderBy: 'year'
      };

      const movies = await Controller.find(params);

      expect(movies[0].title).to.eql(secondTitle);
      expect(movies[0].release_year).to.eql(secondYear);
      expect(movies.length).to.eql(1);
    });

  });

});
