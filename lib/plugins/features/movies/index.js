'use strict';

const MovieValidator = require('../../../validators/movie');

const QueryValidator = require('../../../validators/query');

const LocationValidator = require('../../../validators/location');

const Controller = require('./controller');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.createMovie(request.payload));
      },
      validate: {
        payload: MovieValidator
      }
    }
  }, {
    method: 'POST',
    path: '/movies/{id}/locations',
    config: {
      handler: (request, reply) => {
        reply(Controller.createLocation(request.payload, request.params.id));
      },
      validate: {
        payload: LocationValidator
      }
    }
  }, {
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.find(request.query));
      },
      validate: {
        query: QueryValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
