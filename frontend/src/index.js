import React from "react";
// Importing render module to render
// code for our index page.
import { render } from "react-dom";
// Importing class-based component called "Generation"
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";

import "./index.css";

render(
  <div>
    <h2>Dragon Stack</h2>
    <Generation />
    <Dragon />
  </div>,
  document.getElementById("root")
);
