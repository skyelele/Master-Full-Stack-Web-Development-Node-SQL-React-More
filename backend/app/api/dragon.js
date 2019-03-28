// Requiring the Router component from the express module
const { Router } = require("express");

// Defining new router as name "router"
const router = new Router();

// Defining a GET route to create a new dragon :)
router.get("/new", (req, res) => {
  res.json({ dragon: req.app.locals.engine.generation.newDragon() });
});

// Exporting the GET new Dragon router
module.exports = router;
