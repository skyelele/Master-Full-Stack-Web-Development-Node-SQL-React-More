import React, { Component } from "react";
import Home from "./Home";
import AuthForm from "./AuthForm";

class Root extends Component {
  render() {
    return true ? <Home /> : <Authform />;
  }
}

export default Root;
