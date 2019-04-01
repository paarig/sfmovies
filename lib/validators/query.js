'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  year: Joi.number().integer().min(1878).max(9999).optional(),
  start_yr: Joi.number().integer().min(1878).max(9999).optional(),
  end_yr: Joi.number().integer().min(1878).max(9999).optional(),
  title: Joi.string().min(1).max(255).optional(),
  orderBy: Joi.string().valid('year', 'title', 'id').optional(),
  order: Joi.string().valid('asc', 'desc').optional()
});
