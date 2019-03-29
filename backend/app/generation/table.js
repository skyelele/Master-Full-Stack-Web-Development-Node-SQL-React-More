// WIll hold any methods that interact with the
// generation table :)

// To interact with generation table in the first place
// we need to access that database pool object

const pool = require("../../databasePool");

class GenerationTable {
  // Static functions allow you to use them without
  // making an instance, which is not what we want
  static storeGeneration(generation) {
    pool.query(
      // $1 refers to 1st argument
      // I.e. Insert 1st value of VALUES into
      // generation(expiration)
      "INSERT INTO generation(expiration) VALUES($1)",
      [generation.expiration],
      (error, response) => {
        if (error) return console.error(error);
      }
    );
  }
}

module.exports = GenerationTable;
