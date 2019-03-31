// Requiring the Router component from the express module
const { Router } = require("express");
const DragonTable = require("../dragon/table");

// Defining new router as name "router"
const router = new Router();

// Defining a GET route to create a new dragon :)
router.get("/new", (req, res, next) => {
  const dragon = req.app.locals.engine.generation.newDragon();

  DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
      console.log("dragonId", dragonId);

      dragon.dragonId = dragonId;

      res.json({ dragon });
    })
    .catch(error => next(error));
});

// Exporting the GET new Dragon router
module.exports = router;
