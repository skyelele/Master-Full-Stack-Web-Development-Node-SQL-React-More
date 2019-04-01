import React from "react";
// Importing render module to render
// code for our index page.
import { render } from "react-dom";
// Importing class-based component called "Generation"
import Generation from "./components/Generation";

render(
  <div>
    <h2>Dragon Stack from React</h2>
    <Generation />
  </div>,
  document.getElementById("root")
);
