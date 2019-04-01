import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// Importing render module to render
// code for our index page.
import { render } from "react-dom";
// Importing class-based component called "Generation"
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";
import { generationReducer } from "./reducers";
import { generationActionCreator } from "./actions/generation";
import "./index.css";

const store = createStore(
  generationReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// When store.subscribe() is fired,
// it will log the current state of the store :)

// Must call this before any store.dispatch() calls
store.subscribe(() => console.log("store state update", store.getState()));

fetch("http://localhost:3001/generation")
  .then(response => response.json())
  .then(json => {
    store.dispatch(generationActionCreator(json.generation));
  });

render(
  // Every component in our app will now be able to
  // access the store via PROPS.
  <Provider store={store}>
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
    </div>
  </Provider>,
  document.getElementById("root")
);
