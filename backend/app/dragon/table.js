const pool = require("../../databasePool");

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId } = dragon;

    // Returning a new promise as the result
    // of stored dragon, and then our callback is
    // going have a resolve + reject parameter

    return new Promise((resolve, reject) => {
      // The pool query we want to run is an
      // insert query since we're inserting
      // a dragon entry into the database
      // that will insert into the Dragon
      // table, and then we specify the schema
      // we want to insert into it.
      // For now, that is birthdate, nickname,
      // and generationId

      // Schemas inserted into dragon entry

      // Perserve generationId casing with double
      // quotes
      pool.query(
        // Dragon Entry
        `INSERT INTO dragon(birthdate, nickname, "generationId") VALUES($1, $2, $3) RETURNING id`,
        // Array with all the values we want to insert into
        // the sequence statement
        // Note: Order matters :)
        [birthdate, nickname, generationId],
        (error, response) => {
          if (error) return reject(error);

          const dragonId = response.rows[0].id;

          // I.e. Returning the dragonId :)
          resolve({ dragonId });
        }
      );
    });
  }
}

module.exports = DragonTable;