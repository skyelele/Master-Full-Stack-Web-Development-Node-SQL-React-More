const pool = require("../../databasePool");
const DragonTraitTable = require("../dragonTrait/table");

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

          // Makes sure each of the inner promises
          // get resolved and return the .then
          // handler in the same order
          // that it was passed in.
          Promise.all(
            dragon.traits.map((traitType, traitValue) => {
              return DragonTraitTable.storeDragonTrait({
                dragonId,
                traitType,
                traitValue
              });
            })
          )
            .then(() => resolve({ dragonId }))
            .catch(error => reject(error));
        }
      );
    });
  }

  static getDragon({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthdate, nickname, "generationId" 
        FROM dragon 
        WHERE dragon.id = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0) return reject(new Error("no dragon"));

          resolve(response.rows[0]);
        }
      );
    });
  }

  static updateDragon({ dragonId, nickname }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE dragon SET nickname = $1 WHERE id = $2`,
        [nickname, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

DragonTable.getDragon({ dragonId: 1 })
  .then(dragon => console.log(dragon))
  .catch(error => console.error("error", error));

module.exports = DragonTable;
