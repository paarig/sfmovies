<<<<<<< HEAD
'use strict';
=======
'use strict'
>>>>>>> f8fee37... chore(db): sets up initial boilerplate for postgres database

const Knex = require('knex');

const DatabaseConfig = require('../../db');

module.exports = Knex(DatabaseConfig);
