'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  let movieId;

  describe('createMovie', () => {

    it('creates a movie', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      movieId = response.result.id;
    });

  });

  describe('createLocation', () => {

    it('creates a location', async () => {
      const response = await Movies.inject({
        url: `/movies/${movieId}/locations`,
        method: 'POST',
        payload: { name: 'test location' }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.locations.at(0).get('name')).to.eql('test location');
    });

  });

  describe('find', () => {

    it('finds all movies', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'GET'
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result).to.be.an('array');
    });

  });

});
