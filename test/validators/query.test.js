'use strict';

const Joi = require('joi');

const QueryValidator = require('../../lib/validators/query');

describe('query validator', () => {

  describe('year', () => {

    it('is after 1878', () => {
      const payload = {
        year: 1800
      };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        year: 11111
      };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('start_yr', () => {

    it('is after 1878', () => {
      const payload = {
        start_yr: 1800
      };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('start_yr');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        start_yr: 11111
      };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('start_yr');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('end_yr', () => {

    it('is after 1878', () => {
      const payload = {
        end_yr: 1800
      };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('end_yr');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        end_yr: 11111
      };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('end_yr');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('title', () => {

    it('is less than 255 characters', () => {
      const payload = { title: 'a'.repeat(256) };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('order_by', () => {

    it('only allows db columns', () => {
      const payload = { order_by: 'invalid db column' };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('order_by');
      expect(result.error.details[0].type).to.eql('any.allowOnly');
    });

  });

  describe('order', () => {

    it('only allows asc/desc', () => {
      const payload = { order: 'invalid order' };
      const result = Joi.validate(payload, QueryValidator);

      expect(result.error.details[0].path[0]).to.eql('order');
      expect(result.error.details[0].type).to.eql('any.allowOnly');
    });

  });

});
