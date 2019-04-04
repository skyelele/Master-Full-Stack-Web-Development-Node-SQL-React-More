// Requiring the Router component from the express module
const { Router } = require("express");
const DragonTable = require("../dragon/table");
const AccountDragonTable = require("../accountDragon/table");
const { authenticatedAccount } = require("./helper");

// Defining new router as name "router"
const router = new Router();

// Defining a GET route to create a new dragon :)
router.get("/new", (req, res, next) => {
  let accountId, dragon;

  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      accountId = account.id;

      dragon = req.app.locals.engine.generation.newDragon();

      return DragonTable.storeDragon(dragon);
    })
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId;

      return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
    })
    .then(() => res.json({ dragon }))
    .catch(error => next(error));
});

// Exporting the GET new Dragon router
module.exports = router;
