// Will access the POOL in order to
// run queries

const pool = require("../databasePool");
const TRAITS = require("../data/traits");

TRAITS.forEach(TRAIT => {
  const traitType = TRAIT.type;
  const traitValues = TRAIT.values;

  traitValues.forEach(traitValue => {
    pool.query(
      `INSERT INTO trait("traitType", "traitValue") 
      VALUES($1, $2)
      RETURNING id`,
      [traitType, traitValue],
      (error, response) => {
        if (error) console.log(error);

        const traitId = response.rows[0].id;

        console.log(`Inserted trait - id; ${traitId}`);
      }
    );
  });
});
