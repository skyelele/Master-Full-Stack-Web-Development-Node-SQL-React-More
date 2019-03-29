// WIll hold any methods that interact with the
// generation table :)

// To interact with generation table in the first place
// we need to access that database pool object

const pool = require("../../databasePool");

class GenerationTable {
  // Static functions allow you to use them without
  // making an instance, which is not what we want

  // Can force JS to interact with this function
  // in a timed way that we have control over.
  // Like an actual promise, we can fulfill
  // and resolve the promise and return data
  // or like an actual promise we can break
  // the promise and reject it in the vent of an error.

  // We can control the return value of the promise
  // in the event of an error.

  static storeGeneration(generation) {
    return new Promise((resolve, reject) => {
      pool.query(
        // $1 refers to 1st argument
        // I.e. Insert 1st value of VALUES into
        // generation(expiration)
        "INSERT INTO generation(expiration) VALUES($1) RETURNING id",
        [generation.expiration],
        (error, response) => {
          if (error) return reject(error);

          const generationId = response.rows[0].id;

          resolve({ generationId });
        }
      );
    });
  }
}

module.exports = GenerationTable;
