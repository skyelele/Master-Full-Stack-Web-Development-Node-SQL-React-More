const express = require("express");
const GenerationEngine = require("./generation/engine");
// Importing dragon router to make new dragon
const dragonRouter = require("./api/dragon");
const generationRouter = require("./api/generation");

// Creating new express app :)
const app = express();
// Creating new generation engine
const engine = new GenerationEngine();

// Setting engine to be used locally in any file
// by using req.app.locals.engine...
app.locals.engine = engine;

// You must make sure the app USES the dragon
// via app.use("website route that calls that specific route",
// name of route required/defined at top of main app code.)
app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);

// Calling start() method from engine (GenerationEngine class)
engine.start();

// Exporting this app file (index.js) for use in
// other file directories :)
module.exports = app;
