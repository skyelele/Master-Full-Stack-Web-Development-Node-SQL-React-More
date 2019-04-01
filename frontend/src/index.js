import React from "react";
import { createStore } from "redux";
// Importing render module to render
// code for our index page.
import { render } from "react-dom";
// Importing class-based component called "Generation"
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";
import "./index.css";

const DEFAULT_GENERATION = { generationId: "", expiration: "" };

const GENERATION_ACTION_TYPE = "GENERATION_ACTION_TYPE";

const generationReducer = (state, action) => {
  if (action.type === GENERATION_ACTION_TYPE) {
    return { generation: action.generation };
  }

  return {
    generation: DEFAULT_GENERATION
  };
};

const store = createStore(generationReducer);

// When store.subscribe() is fired,
// it will log the current state of the store :)

// Must call this before any store.dispatch() calls
store.subscribe(() => console.log("store state update", store.getState()));

store.dispatch({
  type: GENERATION_ACTION_TYPE,
  generation: { generationId: "goo", expiration: "bar" }
});

// FUNCTION that is RETURNING an action object :)
const generationActionCreator = payload => {
  return {
    type: GENERATION_ACTION_TYPE,
    generation: payload
  };
};

// Action object itself
const zooAction = generationActionCreator({
  generationId: "zoo",
  expiration: "bar"
});

// Above single action being dispatched
// to store
store.dispatch(zooAction);

fetch("http://localhost:3001/generation")
  .then(response => response.json())
  .then(json => {
    store.dispatch(generationActionCreator(json.generation));
  });

render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>,
  document.getElementById("root")
);
