const { Pool } = require("pg");
const databaseConfiguration = require("./secrets/databaseConfiguration");

// New instance of Pool class
const pool = new Pool();

module.exports = pool;
