import React from "react";
import { createStore, applyMiddleware } from "redux";

// Gives redux the ability to handle actions
// dispatched as functions
import { Provider } from "react-redux";
// Importing render module to render
// code for our index page.
import { render } from "react-dom";
import thunk from "redux-thunk";
// Importing class-based component called "Generation"
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";
import rootReducer from "./reducers";
import "./index.css";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

render(
  // Every component in our app will now be able to
  // access the store via PROPS.

  // In order for each component to use the store via props
  // you need to import { connect } from react-redux.
  <Provider store={store}>
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
    </div>
  </Provider>,
  document.getElementById("root")
);
