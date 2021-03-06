const pool = require("../../databasePool");
const DragonTraitTable = require("../dragonTrait/table");

class DragonTable {
  static storeDragon(dragon) {
    const {
      birthdate,
      nickname,
      generationId,
      isPublic,
      saleValue,
      sireValue
    } = dragon;

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
        `INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue") VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
        // Array with all the values we want to insert into
        // the sequence statement
        // Note: Order matters :)
        [birthdate, nickname, generationId, isPublic, saleValue, sireValue],
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
        `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue" 
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

  static updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }) {
    const settingsMap = { nickname, isPublic, saleValue, sireValue };

    const validQueries = Object.entries(settingsMap).filter(
      ([settingKey, settingValue]) => {
        if (settingValue !== undefined) {
          return new Promise((resolve, reject) => {
            pool.query(
              `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
              [settingValue, dragonId],
              (error, response) => {
                if (error) return reject(error);

                resolve();
              }
            );
          });
        }
      }
    );
  }
}

module.exports = DragonTable;
