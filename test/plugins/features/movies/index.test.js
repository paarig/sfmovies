'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
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
